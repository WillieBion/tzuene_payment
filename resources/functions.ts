import { randomUUID } from "crypto";
import { ResponseDTO } from "../types/responseDTO";


//Date function
export function getISODate(): string {
    return new Date().toISOString();
}

// console.log(getISODate()); //2021-08-25T14:57:00.000Z

export function generateUUID(): string {
    return randomUUID();
}

// Generate ticket ID
export function generateTicketId(): string {
    const prefix = "0000"
    const length = 8;
    const digits = "0123456789";
    let receipt = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length)
        receipt += digits.charAt(randomIndex);
    }

    return prefix + receipt;
}

// const transIdGenerator = () => {
//     const prefix = "0000"
//     const length = 6;
//     const digits = "0123456789";
//     let receipt = ""

//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * digits.length)
//         receipt += digits.charAt(randomIndex);
//     }

//     return prefix + receipt;

// }

//Create response Handler

export const responseHandler = ({ statusCode, message }: ResponseDTO) => {
    return {
        statusCode: statusCode,
        message: message
    }
}