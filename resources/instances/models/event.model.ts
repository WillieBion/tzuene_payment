import { mongoose } from "../../appResources";
import { mongoInstance } from "../mongo";


const EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    date: String, // or Date if you want it parsed as a JS Date
    time: String,
    eventCategoryId: mongoose.Schema.Types.ObjectId,
    provinceId: mongoose.Schema.Types.ObjectId,
    cityId: mongoose.Schema.Types.ObjectId,
    avatar: String,
    companyId: mongoose.Schema.Types.ObjectId,
    isArchived: String,
    createdAt: Date,
    updatedAt: Date
}, { strict: false });

export const EventModel = mongoInstance.model('Event', EventSchema, 'Event');