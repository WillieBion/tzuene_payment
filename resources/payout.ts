import { Payout } from "../types/requestTypes";
import { getISODate } from "./functions";


export const createDeposit = (depositId: string, amount: string, msisdn: string, orderId: string, customer_id: string, statementDescription: string) => {
    console.log('Creating payout...');
    const obj: Payout = {
        "depositId": `${depositId}`,
        "amount": `${amount}`,
        "currency": "ZMW",
        "correspondent": "ZAMTEL_ZMB",
        "payer": {
            "address": {
                "value": `${msisdn}`
            },
            "type": "MSISDN"
        },
        "customerTimestamp": getISODate(),
        "statementDescription": `${statementDescription}`,
        "country": "ZMB",
        "metadata": [
            {
                "fieldName": "orderId",
                "fieldValue": `${orderId}`,
            },
            {
                "fieldName": "customerId",
                "fieldValue": `${customer_id}`,
                "isPII": true
            }
        ]
    }

    return obj;
}