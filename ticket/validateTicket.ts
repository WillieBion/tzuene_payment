import { api } from "encore.dev/api";
import { ResponseDTO } from "../types/responseDTO";
import { responseHandler } from "../resources/functions";
import { prismaDBPrimary } from "../resources/appResources";
import HttpStatus from "../resources/httpStatusCode";


interface Request {
    event_id: string
    bookind_id: string
}

interface Response {
    [x: string]: unknown
}


export const validateTicket = api({
    method: 'POST',
    path: '/tzuene/validateTicket',
    expose: true,
}, async (payload: Request): Promise<ResponseDTO<Response>> => {

    try {
        const { event_id, bookind_id } = payload

        // const ticket = await prismaDBPrimary.tickets.findUnique({
        //     where: {
        //         eventId: event_id,
        //         bookingId: bookind_id
        //     }
        // })
        // I want to update ticket status to invalid
        const ticketUpdate = await prismaDBPrimary.tickets.update({
            where: {
                eventId: event_id,
                bookingId: bookind_id
            },
            data: {
                status: 'INVALID'
            }
        })

        // Will this below work for ticketUpdate?

        if (!ticketUpdate) {
            return responseHandler({ statusCode: HttpStatus.NOT_FOUND, message: 'Ticket not found' }) as ResponseDTO<Response>
        }

        return responseHandler({ statusCode: HttpStatus.OK, message: 'Ticket validated successfully' }) as ResponseDTO<Response>
    } catch (error) {
        console.log('Error getting ticket:', error)
        return responseHandler({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error }) as ResponseDTO<Response>
    }
})