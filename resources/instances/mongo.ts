// import mongoose from "mongoose";
import { mongoose } from '../appResources'

const mongoURI = process.env.DATABASE_URL_FEEDER;

if (!mongoURI) {
    throw new Error("DATABASE_URL_FEEDER is not defined");
}

const mongoInstance = mongoose.createConnection(mongoURI);

export { mongoInstance }


