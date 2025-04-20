import puppeteer from 'puppeteer';
import { TicketPDFData } from '../types/emailTypes';
import { generateQrCode } from '../resources/qrCode/generateQrCode';



// You can make this a separate file or a function that returns a string
async function getTicketHtml(ticket: TicketPDFData): Promise<string> {
  // Use your real data here!

  // I need to get event information from Mongo DB event.
   

  // I need to call encryption function first <====> Check events service for code ref

  //After that I will call the generate QRcode function to generate with the encrypted data
    const qrCodeURI = await generateQrCode(JSON.stringify(ticket)) as string
    // console.log("URI: =====> ", qrCodeURI)



  return `
  <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Event Ticket</title>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f6f7fb;
          margin: 0;
          padding: 0;
        }
        .ticket-card {
          background: #fff;
          width: 420px;
          margin: 30px auto;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(44,62,80,0.12);
          overflow: hidden;
          position: relative;
        }
        .header {
          /* background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); */
          /* background: #d32f2f; */
          color: #fff;
          padding: 24px 24px 16px 24px;
          display: flex;
          align-items: center;
        }
        .event-img {
          width: 72px;
          /* height: 96px; */
          border-radius: 12px;
          object-fit: cover;
          background: #eee;
          margin-right: 20px;
        }
        .event-details h2 {
          margin: 0 0 4px 0;
          font-size: 1.4em;
          color: black;
        }
        .event-details .subtitle {
          font-size: 1em;
          margin-bottom: 2px;
          color: black;
        }
        .event-details .datetime,
        .event-details .location {
          font-size: 0.95em;
          opacity: 0.85;
          color: black;
        }
        .info-section {
          padding: 18px 24px 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* background-color: #6a11cb; */
        }
        .info-section .label {
          color: black;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .info-section .value {
          font-size: 1.1em;
          margin-bottom: 8px;
        }
        .qr-section {
          text-align: center;
          padding: 24px 0 0 0;
        }
        .qr-section img {
          background: #fff;
          padding: 10px;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(44,62,80,0.10);
        }
        .booking-id {
          text-align: center;
          font-size: 1em;
          margin: 14px 0 0 0;
        }
        .support {
          text-align: center;
          color: #6a11cb;
          margin: 8px 0 0 0;
          font-size: 0.95em;
        }
        .footer {
          background: #ffe2e2;
          color: #d32f2f;
          text-align: center;
          padding: 12px 0 2px 0;
          font-size: 0.95em;
          margin-top: 18px;
        }
        .download-btn {
          display: block;
          width: 90%;
          margin: 20px auto 24px auto;
          background: #d32f2f;
          color: #fff;
          text-align: center;
          padding: 12px 0;
          border-radius: 24px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1em;
        }
      </style>
    </head>
    <body>
      <div class="ticket-card">
        <div class="header">
          <img class="event-img" src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d" alt="Event Image"/>
          <div class="event-details">
            <h2>Alice Chengelo</h2>
            <div class="subtitle">Sing for all</div>
            <div class="datetime">Sat, 17 Dec | 5:15 PM</div>
            <div class="location">East Park Mall · Lusaka</div>
          </div>
        </div>
        <div class="info-section">
          <!-- <div class="label">Admit:</div>
          <div class="value">John Doe</div>
          <div class="label">Tickets:</div>
          <div class="value">4</div> -->
          <div class="label">Venue:</div>
          <div class="value">Open Gardens</div>
          <!-- <div class="label">Seats:</div>
          <div class="value">M3, M4, M5, M8</div> -->
        </div>
        <div class="qr-section">
          <img src=${qrCodeURI} width="160" height="160" alt="QR Code"/>
        </div>
        <div class="booking-id">Booking ID: ${ticket.ticketId}</div>
        <div class="support">Contact support</div>
        <a href="#" class="download-btn">Download Ticket</a>
        <div class="footer">
          Cancellation unavailable: cut off time of 5 hrs<br/>
          before showtime has passed
        </div>
      </div>
    </body>
    </html>
    `;
}

export async function generateTicketPDF(ticket: TicketPDFData): Promise<Buffer> {
  const html = await getTicketHtml(ticket);
  const browser = await (puppeteer as any).launch({ headless: 'new' }); // headless: true in most puppeteer versions
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A5',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });
  await browser.close();
  return pdfBuffer;
}