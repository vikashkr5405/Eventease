import express from "express"
const router = express.Router();
// import pagecontroller functions
import pageController from "../controllers/pageController.js"

//import middleware 
import protect from "../middleware/authMiddleware.js";

router.get("/Eventease",pageController.showHomePage);
router.get("/profile",protect,pageController.showProfilePage)
router.get("/login",pageController.showLoginPage)
router.get("/register",pageController.showRegisterPage)

export default router;
