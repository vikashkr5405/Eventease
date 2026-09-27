import Event from "../models/Event.js";

// create event
const createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            organizer: req.user._id
        })
        res.redirect("/admin/events");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Edit Events
const editEvents = async (req, res) => {
    try {
        const {
            title,
            discription,
            category,
            venue,
            city,
            eventDate,
            startTime,
            endTime,
            price,
            totalSeats,
            availableSeats
        } = req.body;
        await Event.findByIdAndUpdate(
            req.params.id,
            {
                title,
                discription,
                category,
                venue,
                city,
                eventDate,
                startTime,
                endTime,
                price,
                totalSeats,
                availableSeats
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.redirect("/admin/events");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get All event
const getAllEvent = async (req, res) => {
    try {
        const events = await Event.find().populate("organizer", "name email");
        // populate() converts stored ObjectId into full document data.
        // Replace organizer id with organizer details, but show only name and email.
        return res.status(201).json({
            success: true,
            count: events.length,
            events
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export default {
    createEvent,
    getAllEvent,
    editEvents
}