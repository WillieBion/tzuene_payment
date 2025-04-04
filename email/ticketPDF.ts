import { TicketPDFData } from '../types/emailTypes'
import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'

export async function generateTicketPDF(ticket: TicketPDFData): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
        try {
            // Generate QR code
            const qrCodeDataUrl = await QRCode.toDataURL(ticket.ticketId)
            
            // Create PDF
            const doc = new PDFDocument({
                size: [400, 600], // Mobile-friendly size
                margin: 20
            })
            
            const chunks: Buffer[] = []
            doc.on('data', (chunk: Buffer) => chunks.push(chunk))
            doc.on('end', () => resolve(Buffer.concat(chunks)))
            doc.on('error', reject)

            // Set background color
            doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff')

            // Event Image Placeholder (top section)
            doc.rect(0, 0, doc.page.width, 150).fill('#f0f0f0')
            doc.fontSize(10).fillColor('#666666').text('Event Image Placeholder', 150, 65, { align: 'center' })

            // Event Details
            doc.moveDown(2)
            doc.font('Helvetica-Bold').fontSize(24).fillColor('#000000')
            doc.text('Alice Chengelo', { align: 'left' })
            
            doc.moveDown(0.5)
            doc.fontSize(14).fillColor('#666666')
            doc.text('Sing for all', { align: 'left' })
            
            doc.moveDown(0.5)
            doc.fontSize(12)
            doc.text('Sat, 17 Dec | 5:15 PM', { align: 'left' })
            doc.text('East park Mall : Lusaka', { align: 'left' })

            // Ticket Count
            doc.moveDown(1)
            doc.fontSize(16).fillColor('#000000')
            doc.text('4 Tickets', { align: 'left' })

            // Venue Section
            doc.moveDown(0.5)
            doc.fontSize(20).fillColor('#000000')
            doc.text('Open Gardens', { align: 'left' })
            
            doc.moveDown(0.5)
            doc.fontSize(14).fillColor('#666666')
            doc.text(`Seat #- ${ticket.ticketType}`, { align: 'left' })

            // QR Code
            const qrSize = 150
            const qrX = (doc.page.width - qrSize) / 2
            doc.image(qrCodeDataUrl, qrX, doc.y + 20, { width: qrSize })

            // Booking ID
            doc.moveDown(8)
            doc.fontSize(12).fillColor('#000000')
            doc.text(`Booking ID: ${ticket.ticketId}`, { align: 'center' })

            // Contact Support
            doc.moveDown(1)
            doc.fontSize(12).fillColor('#666666')
            doc.text('Contact support', { align: 'center' })

            // Cancellation Policy
            doc.moveDown(1)
            doc.rect(0, doc.y, doc.page.width, 50).fill('#ffebee')
            doc.fillColor('#d32f2f')
            doc.text('Cancellation unavailable: cut off time of 5 hrs', { align: 'center' })
            doc.text('before showtime has passed', { align: 'center' })

            doc.end()
        } catch (error) {
            reject(error)
        }
    })
}
