import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
const result = dotenv.config();
console.log(result);
const app = express();
const port = process.env.PORT || 3000;
import connectDB from './config/db.js';
import pageRoutes from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

import cookieParser from 'cookie-parser';
import paymentRoutes from "./routes/paymentRoutes.js";

// Database
connectDB();

// Middleware
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

// View Engine
app.set("view engine","ejs");

//routes
app.use('/',pageRoutes);
app.use('/auth',authRoutes);
app.use('/events',eventRoutes);
app.use('/bookings',bookingRoutes);
app.use('/payment',paymentRoutes);
app.use('/admin',adminRoutes);


// server start
app.listen(port,()=>{
    console.log("server is running fine on port : ",port);
})