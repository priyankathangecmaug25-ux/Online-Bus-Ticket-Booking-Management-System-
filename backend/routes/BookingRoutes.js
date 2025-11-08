import express from "express";
import {
  addBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  getBookingsByUser, 
  deleteBooking
} from "../controllers/BookingController.js";
import { verifyToken, authorize } from "../middlewares/VerifyToken.js";
import { ROLES } from "../constants/RoleConstants.js";

const router = express.Router();

router.post("/add", verifyToken, authorize([ROLES.USER]), addBooking);
router.get("/getAll", verifyToken, authorize([ROLES.ADMIN]), getAllBookings);
router.get("/get/:id", verifyToken, authorize([ROLES.ADMIN, ROLES.USER]), getBookingById);
router.put("/update/:id", verifyToken, authorize([ROLES.ADMIN]), updateBooking);
router.delete("/delete/:id", verifyToken, authorize([ROLES.ADMIN,ROLES.USER]), deleteBooking);
router.get("/getByUser/:userId", verifyToken, authorize([ROLES.USER, ROLES.ADMIN]), getBookingsByUser);
export default router;
