import puppeteer from 'puppeteer';
import { TicketPDFData } from '../types/emailTypes';
import { generateQrCode } from '../resources/qrCode/generateQrCode';
import { cryptoEncryption } from '../resources/security/encryptor';



// You can make this a separate file or a function that returns a string
async function getTicketHtml(ticket: TicketPDFData): Promise<string> {
  // Use your real data here!

  // I need to get event information from Mongo DB event.


  // I need to call encryption function first <====> Check events service for code ref

  //After that I will call the generate QRcode function to generate with the encrypted data
  // const { event, ...dataToGenerateQrCode } = ticket

  const encryptedData = cryptoEncryption(JSON.stringify(ticket.eventId), process.env.PUBLIC_KEY!)
  const qrCodeURI = await generateQrCode(encryptedData) as string
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
          width: 350px;
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
          text-align: center;
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
          /* color: #6a11cb; */
          margin: 8px 0 0 0;
          font-size: 0.95em;
          /* background: #f6f7fb; */
          /* padding: 5px 24px; */
        }
        .footer {
          background: #ffe2e2;
          color: #d32f2f;
          text-align: center;
          padding: 12px 0 2px 0;
          font-size: 0.95em;
          /* margin-top: 0; */
        }
        .download-btn {
          display: block;
          width: 100%;
          margin: 30px auto 0px auto;
          background: #d32f2f;
          color: #fff;
          text-align: center;
          padding: 12px 0;
          /* border-radius: 24px; */
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1em;
        }
        .contact-us {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: #000;

        }
        .bottom-content {
          display: flex;
          flex-direction: column;

        }
      </style>
    </head>
    <body>
      <div class="ticket-card">
        <div class="header">
          <img class="event-img" src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d" alt="Event Image"/>
          <div class="event-details">
            <h2>${ticket.event.name}</h2>
<!-- <div class="subtitle">${ticket.event.description}</div> --!>
            <div class="datetime">${ticket.event.date} | ${ticket.event.time}</div>
            <div class="location">${ticket.event.cityId}</div>
          </div>
        </div>
        <div class="info-section">
          <div class="label">Venue:</div>
          <div class="value">${ticket.event.location}</div>
        </div>
        <div class="qr-section">
          <img src="${qrCodeURI}" width="160" height="160" alt="QR Code"/>
        </div>
        <div class="booking-id">Booking ID: ${ticket.bookingId}</div>
        <div class="support">
          <a href="https://tzuene.byte-hub.co/contact-us" class="contact-us">Contact support
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24px">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
          </a>
        </div>
        <div class="">
          <a href="${ticket.event_uri}" class="download-btn">View Event</a>
          <div class="footer">
            Cancellation unavailable: cut off time of 5 hrs<br/>
            before showtime has passed
          </div>
        </div>
       
      </div>
    </body>
    </html>
    `;
}

export async function generateTicketPDF(ticket: TicketPDFData): Promise<Buffer> {
  const html = await getTicketHtml(ticket);
  const browser = await (puppeteer as any).launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] }); // headless: true in most puppeteer versions
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