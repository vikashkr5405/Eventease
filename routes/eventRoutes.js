import express from "express"
const router = express.Router();
import eventControllers from "../controllers/eventControllers.js";
import protect from "../middleware/authMiddleware.js"
import adminOnly from "../middleware/adminMiddleware.js"

// create event
router.post("/create",protect,adminOnly,eventControllers.createEvent);
// Get all events
router.get("/get",eventControllers.getAllEvent);
router.post("/edit/:id",protect,adminOnly,eventControllers.editEvents)

export default router;
