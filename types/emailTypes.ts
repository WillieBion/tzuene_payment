export interface EmailRequest {
    to: string
    subject: string
    html?: string
    text?: string
    attachments?: EmailAttachment[]
}

export interface EmailAttachment {
    filename: string
    content: string | Buffer
    contentType: string
}

export interface TicketEmailData {
    customerId: string
    customerEmail: string
    tickets: TicketPDFData[]
}

export interface TicketPDFData {
    ticketId: string
    eventId: string
    ticketType: string
    amount: string
}
