import * as dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({
    path: resolve(__dirname, '.env')
});

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
console.log('Environment configuration loaded:', {
    ...env,
    PAWAPAY_DEV_TOKEN: '***[HIDDEN]***',
    DATABASE_URL: '***[HIDDEN]***',
    DATABASE_URL_FEEDER: '***[HIDDEN]***',
    SMTP_PASS: '***[HIDDEN]***'
});