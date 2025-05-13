import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { cryptoEncryption, cyprtoDecryption, decryptObject, encryptObject } from './resources/security/encryptor';

// Load environment variables from .env file
dotenv.config({
    path: resolve(process.cwd(), '.env')
});

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAw+CtOIfYvqJwIgF3oZWO
fCVwm0JxodW0XuQOkPbrQeOZLGYIKEMlR74QJc8LKtVv7TnAcr6ah98WUQ2iOx6E
YblWyxo2YpPpAJgab1H95c5JWul3R1aGbKtm7qQP5aAahRzxKQlO0XYZM7UcviL5
4YLXuigu6p8uMmieAvZ+uZlc05ntU7tlKN6m0B/iGs3C6rKNJZoqd2U5rJo+caUd
7Vysf/MR3YCuxA5flHAyQWciTLvopUuQMKB76o16ZG1rrOioAjcps6E1edClQqYa
OdY1IIfloYUDgjMynJnbx+G+jePv+v51IXqV4CzktbC+vlYAnsAw2DGvHUERwJXq
e4ReuJzwXu7TVgA2lc4C0bkW6mZwT4zVU0O2OLQ49OTpF+TPI7XxVB05XMhLEcCJ
w4oaID3h7pXwfGRzEswWTjS/Ui4VC8W/dOxOVdBFcRtdJKUuUtDZ8wxNJXBHZaAZ
OlljCvh/gNdcK/ebeWFm+BYRFhBUH6xKqWIMIkuy7RbW+nZFpnNu2vU+92CXdseE
dL7DE75j15GVb4SrgTf14V3f+zfFp+XcaFTM/YdpxF5nMWoDzn5WzPFkWEVB18h1
TK3QNiPhGFB6C3Cj729HMgixEw2KAgxJa2bWzLxgXC+buHqA0jdic70KRwtSiljR
b4DU/j3i0n9etdOsvkvWUNMCAwEAAQ==
-----END PUBLIC KEY-----`

//check encryptor
// console.log(encryptObject({ name: 'test' }, process.env.ENCRYPTION_KEY!))
// const encryptedData = encryptObject({ name: 'test' }, PUBLIC_KEY!)
// console.log(encryptedData)
// const decryptedText = decryptObject(encryptedData.data, PRIVATE_KEY!)
// console.log(decryptedText)

const encryptedData = cryptoEncryption(JSON.stringify({ name: 'test' }), process.env.PUBLIC_KEY!)
console.log("This is cipher text", encryptedData)

const decryptedText = cyprtoDecryption(encryptedData, process.env.PRIVATE_KEY!)
console.log("This is decrypted text", decryptedText)

// Export configured environment for use in other files
export const env = {
    // Payment providers
    PAWAPAY_BASE_URL: process.env.PAWAPAY_BASE_URL,
    PAWAPAY_DEV_TOKEN: process.env.PAWAPAY_DEV_TOKEN,
    AIRTEL: process.env.AIRTEL,
    MTN: process.env.MTN,
    ZAMTEL: process.env.ZAMTEL,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_FEEDER: process.env.DATABASE_URL_FEEDER,

    // SMTP Configuration
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE === 'true',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,

    //Security
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
} as const;

// Validate required environment variables
const requiredEnvVars = [
    'PAWAPAY_BASE_URL',
    'PAWAPAY_DEV_TOKEN',
    'DATABASE_URL',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM'
] as const;

for (const envVar of requiredEnvVars) {
    if (!env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

// Log environment configuration on startup (excluding sensitive data)
// console.log('Environment configuration loaded:', {
//     ...env,
//     PAWAPAY_DEV_TOKEN: '***[HIDDEN]***',
//     DATABASE_URL: '***[HIDDEN]***',
//     DATABASE_URL_FEEDER: '***[HIDDEN]***',
//     SMTP_PASS: '***[HIDDEN]***'
// });