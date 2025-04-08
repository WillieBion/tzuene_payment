import { api } from "encore.dev/api";
import { PawaPayResponseDTO } from "../types/pawaPayRespDTO";
import { createDeposit } from "../resources/payout";
import { generateUUID, responseHandler } from "../resources/functions";
import { sendTicketEmail } from "../email/email";
import axios from "axios";
import { ResponseDTO } from "../types/responseDTO";
import HttpStatus from "../resources/httpStatusCode";
import { prismaDBPrimary } from "../resources/appResources";
import { Status, Tickets, TicketStatus } from "@prisma/client";
import { Ticket } from "../types/tickets";
import { env } from '../config';

interface Request {
    amount: string
    msisdn: string
    orderId: string
    customer_id: string
    tickets: Ticket[]
}

//Will need to change to Asyncronous implement
export const payment = api({
    method: 'POST', 
    path: '/tzuene/payment', 
    expose: true,
}, async (payload: Request): Promise<ResponseDTO<PawaPayResponseDTO>> => {
    //Get payOut object
    const transactionId = generateUUID();

    const { amount, customer_id, orderId, msisdn, tickets } = payload as Request

    const depositObj = createDeposit(transactionId, amount, msisdn, orderId, customer_id, 'Payment for Ticket');

    //Call the PawaPay API

    const URL = `${env.PAWAPAY_BASE_URL}/deposits`;
    const token = env.PAWAPAY_DEV_TOKEN;

    console.log("URL", URL);
    // console.log("Token", token);

    try {
        const { status, data } = await axios.post<PawaPayResponseDTO>(URL, depositObj, {
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + token,
            }
        })

        if (status === 200) {
            console.log('Payment successful');
            //At this point I will need to store this in the DB.
            const dataToStore = {
                customerId: customer_id,
                msisdn,
                transactionId,
                orderId,
                amount,
                status: data.status as Status,
                rejectCode: data.rejectionReason?.rejectionCode || null,
                rejectReason: data.rejectionReason?.rejectionMessage || null,

            }
            console.log('storing in DB, ==========================>')
            const storeData = await prismaDBPrimary.transactions.create({
                data: dataToStore
            })

            console.log('Data stored in DB ========================>', storeData);

            console.log('creating ticketData ========================>')
            const ticketData = tickets.map((ticket) => {
                return {
                    eventId: ticket.eventId,
                    amount: ticket.amount,
                    status: TicketStatus.VALID,
                    ticketType: ticket.ticketType,
                    transactionId: storeData.id,
                }
            })

            if ((data.status as Status) === 'ACCEPTED'){
                
            console.log('Storing TicketData ========================>');
            const ticketStore = await prismaDBPrimary.tickets.createMany({
                data: ticketData
            })
            console.log('TicketData stored in DB ========================>', ticketStore);
            
            // Trigger email sending asynchronously
            const ticketPDFData = ticketData.map((ticket) => ({
                ticketId: `${ticket.transactionId}`, // Create a unique ticket ID
                eventId: ticket.eventId,
                ticketType: ticket.ticketType,
                amount: ticket.amount
            }))

            try {
                // Get customer email from database
                // const customer = await prismaDBPrimary.user.findUnique({
                //     where: { 
                //         id: parseInt(customer_id) // Convert string ID to number
                //     }
                // })

               
                    // Fire and forget email sending
                    sendTicketEmail({
                        customerId: customer_id,
                        customerEmail: customer_id,
                        tickets: ticketPDFData
                    }).catch((error: Error) => {
                        console.error('Failed to send ticket email:', error)
                    })
                
            } catch (error) {
                console.error('Error getting customer details:', error)
            }
            }
            //    const dataToRespond = {statusCode: HttpStatus.OK, data}
            // const response: ResponseDTO<PawaPayResponseDTO>= {
            //     statusCode: HttpStatus.OK,
            //     message: data
            // }

            // return response;
            const response = responseHandler({ statusCode: HttpStatus.OK, message: data }) as ResponseDTO<PawaPayResponseDTO>;

            return response;
            // return responseHandler({ statusCode: HttpStatus.OK, message: data });
        } else {
            //Even on failures I will need to store this in the DB.
            console.log('Payment failed' + status);
            const response = responseHandler({ statusCode: HttpStatus.BAD_REQUEST, message: data }) as ResponseDTO<PawaPayResponseDTO>
            return response;
        }

    } catch (error) {
        console.log('Payment failed' + error);
        const errResponse = {
            depositId: '',
            status: 'Failed',
            rejectionReason: {
                rejectionCode: '500',
                rejectionMessage: 'Internal Server Error'
            }
        }

        const response = responseHandler({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: errResponse }) as ResponseDTO<PawaPayResponseDTO>;
        return response

    }
})