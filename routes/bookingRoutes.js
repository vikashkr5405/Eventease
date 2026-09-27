import express from "express"
const router = express.Router();
import protect from "../middleware/authMiddleware.js"
import bookEvent from "../controllers/bookingController.js"

// Book Event
router.post("/:eventId",protect,bookEvent);

export default router;
