import { EventModel } from "../models/event.model";

const getAllEvents = async () => {
    return await EventModel.find({}).lean();
}

const getEventById = async (id: string) => {
    return await EventModel.findById(id);
}

export { getAllEvents, getEventById };