import { api } from 'encore.dev/api'
import { EmailRequest, TicketEmailData } from '../types/emailTypes'
import * as dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'
import { prismaDBPrimary } from '../resources/appResources'
import { generateTicketPDF } from './ticketPDF'

dotenv.config()

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

// Async API to send ticket emails
export const sendTicketEmail = api({
    method: 'POST',
    path: '/email/ticket',
}, async (params: TicketEmailData) => {
    const { customerEmail, tickets } = params

    // Generate PDFs for each ticket
    const pdfAttachments = await Promise.all(
        tickets.map(async (ticket) => {
            const pdf = await generateTicketPDF(ticket)
            return {
                filename: `ticket-${ticket.ticketId}.pdf`,
                content: pdf,
                contentType: 'application/pdf'
            }
        })
    )

    const emailData: EmailRequest = {
        to: customerEmail,
        subject: 'Your Tickets',
        html: `
            <h1>Thank you for your purchase!</h1>
            <p>Please find your tickets attached to this email.</p>
            <p>Total tickets: ${tickets.length}</p>
        `,
        attachments: pdfAttachments
    }

    try {
        console.log('sending mail =========================> ' + customerEmail)
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            ...emailData
        })
        
        // Log email sent in database
        await prismaDBPrimary.emailSent.create({
            data: {
                email: customerEmail,
                type: 'TICKET_PURCHASE',
                status: 'SENT',
                metadata: {
                    ticketCount: tickets.length
                }
            }
        })

        return { success: true }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('Failed to send email:', errorMessage)
        
        // Log email failure
        await prismaDBPrimary.emailSent.create({
            data: {
                email: customerEmail,
                type: 'TICKET_PURCHASE',
                status: 'FAILED',
                metadata: {
                    ticketCount: tickets.length,
                    error: errorMessage
                }
            }
        })

        throw new Error(`Failed to send email: ${errorMessage}`)
    }
})
