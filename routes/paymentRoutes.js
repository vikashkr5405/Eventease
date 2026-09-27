import express from "express"
const router = express.Router()
import protect from "../middleware/authMiddleware.js"

import paymentController from '../controllers/paymentController.js';

router.post('/createOrder',protect,paymentController.createOrder)
router.post('/verifyPayment',protect,paymentController.verifyPayment)

export default router;
