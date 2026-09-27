import express from "express"
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js"
import adminController from "../controllers/adminController.js"

router.get("/loginPage",adminController.showAdminLoginPage)
router.post("/login",adminController.adminLogin)
router.get("/dashboard",protect,adminOnly,adminController.showAdminDashboard);

// Events Routes
router.get("/events",protect,adminOnly,adminController.getAllEventsAdmin)
router.post("/events/delete/:id",protect,adminOnly,adminController.deleteEvent)
router.get("/events/create",protect,adminOnly,adminController.showCreateEventPage)
router.get("/events/edit/:id",protect,adminOnly,adminController.showEditEventPage)

// Booking Routes
router.get("/bookings",protect,adminOnly,adminController.getAllBooking)
router.post("/bookings/cancel/:id",protect,adminOnly,adminController.cancelBooking)

// User Routes
router.get("/users",protect,adminOnly,adminController.showUserManagementPage)
router.post("/users/delete/:id",protect,adminOnly,adminController.deleteUser)
export default router;