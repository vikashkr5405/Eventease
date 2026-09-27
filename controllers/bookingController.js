import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import sendEmail from '../utils/sendEmail.js';

const bookEvent = async (req, res) => {
    try {
        const { quantity, paymentStatus } = req.body;

        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        // check Seats
        if (event.availableSeats < quantity) {
            return res.status(404).json({
                success: false,
                message: "not enough seats available"
            });
        }
        // Total Amount
        const totalAmount = quantity * event.price

        // create booking
        const booking = await Booking.create({
            user: req.user._id,
            event: event._id,
            quantity,
            paymentStatus,
            totalAmount
        })

        // Reduce seats
        event.availableSeats -= quantity;
        await event.save();

        // send Email (Important feature)
        try {
            await sendEmail({
                email: req.user.email,
                subject: `Booking Confirmed - ${event.title}`,
                html: `
        <h2>Booking Successful</h2>
        <p>Hi, ${req.user.name},</p>

        <h3>Event Details</h3>
        <p><strong>Event:</strong> ${event.title}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    `
            });
        } catch (error) {
            console.log("Email failed but booking succeded", error.message);
        }

        res.redirect("/profile")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export default bookEvent;