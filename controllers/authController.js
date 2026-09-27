import User from '../models/User.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //existing user
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.send("user already exist");
        }
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(password);
        console.log(hashPassword);

        await User.create({
            name,
            email,
            password: hashPassword,
            role
        });
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.send("something went wrong");
    }
}

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user exist or not
        const user = await User.findOne({ email });
        if (!user) { return res.send("Invalid credential") }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send("password is not corect!");
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRETKEY,
            {
                expiresIn: "7d"
            }
        );

        // Store token in cookie  
        // Also install cookie-parser
        res.cookie("token", token);
        res.redirect("/profile");
        // return res.status(200).json({
        //     message:"Login successful",
        //     token
        // });

    } catch (error) {
        console.log(error.message);
        return res.send("something went wrong")
    }
}

// Logout
const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    try {
        // delete JWT token
        res.clearCookie("token");
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }

}

export default {
    registerUser,
    loginUser,
    logoutUser
}