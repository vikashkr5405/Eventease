import Booking from "../models/Booking.js"
import Event from "../models/Event.js"
const showProfilePage = async(req,res) =>{
    try {
        const bookings = await Booking.find({
           user:req.user._id
        }).populate("event")
        // populate() is a Mongoose method that replaces a referenced ObjectId 
        // with the actual document from another collection.

        const events = await Event.find();

        res.render("profile",{
           user:req.user,
           bookings,
           events
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
}
const showLoginPage = (req,res) =>{
    res.render("login")
}
const showRegisterPage = (req,res) =>{
    res.render("register")
}
const showDashboardPage = async (req,res) =>{
    res.render("dashboard")
}
const showHomePage = async (req,res) =>{
    res.render("home");
}

export default {
    showProfilePage,
    showLoginPage,
    showRegisterPage,
    showDashboardPage,
    showHomePage
}