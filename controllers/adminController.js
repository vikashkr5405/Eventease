import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Event from "../models/Event.js"
import Booking from "../models/Booking.js"

const showAdminLoginPage = (req, res) => {
    res.render("admin-login")
}
const showCreateEventPage = (req, res) => {
    res.render("create-events");
}
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.send("Admin not found")
        }
        if (user.role !== "admin") {
            return res.send("Access Denied")
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )
        if (!isMatch) {
            return res.send("Invalid credentials")
        }

        // generate token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRETKEY,
            {
                expiresIn: "7d"
            }
        )
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.redirect("dashboard")
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Admin Login Error");
    }
}
const showAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalBookings = await Booking.countDocuments();

        res.render("admin-dashboard", {
            user: req.user,
            totalUsers,
            totalEvents,
            totalBookings
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
}

// Events part
const getAllEventsAdmin = async (req, res) => {
    try {
        const events = await Event.find().populate("organizer", "name email");
        res.render("admin-events", {
            events
        })
    } catch (error) {
        console.log(error.message);
        res.redirect("/admin/dashboard");
    }
}
// delete events
const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(
            req.params.id
        );
        res.redirect("/admin/events")
    } catch (error) {
        console.log(error.message);
        res.redirect("/admin/events");
    }
}
const showEditEventPage = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        res.render("edit-events", {
            event
        });
    } catch (error) {
        console.log(error.message);
        res.redirect("/admin/events");
    }
}
// Bookings
const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user", "name email")
            .populate("event", "title")
        res.render("admin-bookings", {
            bookings
        });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send("Booking not found")
        }
        booking.paymentStatus = "cancelled";
        await booking.save();
        return res.redirect("/admin/bookings")
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
}

// show user managment page
const showUserManagementPage = async(req,res) =>{
    const users = await User.find();
    res.render("admin-users",{
        users
    })
}
const deleteUser = async (req,res) =>{
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users")
}
export default {
    showAdminDashboard,
    adminLogin,
    showAdminLoginPage,
    getAllEventsAdmin,
    deleteEvent,
    showCreateEventPage,
    showEditEventPage,
    getAllBooking,
    cancelBooking,
    showUserManagementPage,
    deleteUser
}