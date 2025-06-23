import { api } from "encore.dev/api";
import { ResponseDTO } from "../types/responseDTO";
import { prismaDBPrimary } from "../resources/appResources";
import { responseHandler } from "../resources/functions";
import HttpStatus from "../resources/httpStatusCode";
import { getEventById } from "../resources/instances/queries/events";


interface Request {
    organizationId: string
}

interface Response {
    totalRevenue: number
    totalTicketsSold: number
    // totalEvents: number
    totalCustomers: number
    orders: {
        orderId: string
        totalRevenue: number
        date: Date
        ticketType: string
        eventName: string
    }[]
}

export const revenueStats = api({
    method: 'POST',
    path: '/tzuene/revenueStats',
    expose: true,
}, async (payload: Request): Promise<ResponseDTO<Response>> => {

    try {
        const { organizationId } = payload
        const orders = [];

        const transactions = await prismaDBPrimary.transactions.findMany({
            select: {
                amount: true
            },
            where: {
                organizationId
            }
        });

        const totalRevenue = transactions.reduce((sum, transaction) => {
            return sum + parseFloat(transaction.amount);
        }, 0);

        const totalTicketsSold = await prismaDBPrimary.tickets.count({
            where: {
                Transactions: {
                    organizationId
                }
            }
        })

        const uniqueAttendees = await prismaDBPrimary.transactions.aggregate({
            _count: {
                customerId: true
            },
            where: {
                organizationId
            }
        })

        const orderStats = await prismaDBPrimary.transactions.findMany({
            where: {
                organizationId,
                status: 'ACCEPTED'
            },
            include: {
                tickets: true
            }
        })


        console.log("orderStats", orderStats)

        // const orders = orderStats.map(async (order) => {
        //     const event = await getEventById(order.tickets[0].eventId);
        //     return {
        //         orderId: order.id,
        //         totalRevenue: order.amount,
        //         date: order.createdAt,
        //         ticketType: order.tickets,
        //         eventName: event?.name
        //     }
        // })

        for(const order of orderStats){
            const event = await getEventById(order.tickets[0].eventId);
            console.log("TICKET", order.tickets)
            const orderList = {
                // orderId: order.tickets[0].bookingId,
                orderId: order.orderId,
                trasactionId: order.transactionId,
                customerId: order.customerId,
                transactionAmountTotal: order.amount,
                date: order.createdAt,
                eventName: event?.name,
                ticketsPurchased: order.tickets.length,
            }
            
            orders.push(orderList);
        }

        const stats = {
            totalRevenue,
            totalTicketsSold,
            totalCustomers: uniqueAttendees._count.customerId,
            orders

        }

        const response = responseHandler({ statusCode: HttpStatus.OK, message: stats }) as ResponseDTO<Response>;

        return response;
    } catch (error) {
        console.log('Error getting revenue stats:', error)
        const response = responseHandler({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error }) as ResponseDTO<Response>;
        return response;
    }




})



export const orderListStat = api({
    method: 'POST',
    path: '/tzuene/orderListStat',
    expose: true,
}, async (payload: Request): Promise<ResponseDTO<Response>> => {



    return responseHandler({ statusCode: HttpStatus.OK, message: 'Order List Stats' }) as ResponseDTO<Response>;
})
