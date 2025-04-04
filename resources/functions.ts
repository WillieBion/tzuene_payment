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

//Create response Handler

export const responseHandler = ({ statusCode, message }: ResponseDTO) => {
    return {
        statusCode: statusCode,
        message: message
    }
}