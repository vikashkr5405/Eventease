import express from "express"
const router = express.Router();

import authController from "../controllers/authController.js"
import protect from "../middleware/authMiddleware.js";

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout",authController.logoutUser);

export default router;