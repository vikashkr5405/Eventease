import jwt from "jsonwebtoken";
import User from "../models/User.js"


const protect = async (req,res,next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.redirect("/login");
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRETKEY
        );
        req.user = await User.findById(decoded.id) .select("-password");
        next();

    } catch (error) {

        console.log(error);

        return res.redirect("/login");
    }
}
// const protect = async (req,res,next) =>{
//     let token
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             if (!token) {
//                 return res.redirect("/login");
//             }
//             const decoded = jwt.verify(
//                 token,
//                 process.env.JWT_SECRETKEY
//             );
//             req.user = await User.findById(decoded.id).select("-password")
//             next();
//         } catch (error) {
//             console.log(error);
//              return res.status(401).json({
//                 success:false,
//                 message:"Not authorized"
//             });
//         }
//     }
//         // Decode be like
//         // Decode result{
//         //     email:"vikash@123"
//         //     password:"123"
//         //     iat:1710000
//         //     exp:1719999
//         // }
// }
export default protect

