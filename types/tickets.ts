import { TicketStatus } from "@prisma/client"

export interface Ticket {
    // eventId: string
    amount: string
    ticketType: string
}