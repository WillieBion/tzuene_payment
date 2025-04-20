import QRCode from "qrcode";


const generateQrCode = async (data: string) => {

    try {
        const generateQrCode = await QRCode.toDataURL(data);
        return generateQrCode;
    } catch (error) {
        console.error('Failed to generate QR code:', error);
        return null;
    }

}


export { generateQrCode };