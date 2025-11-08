import express from "express";
import { registerAdmin} from "../controllers/AdminController.js";
import { verifyToken, authorize } from "../middlewares/VerifyToken.js";
import { ROLES } from "../constants/RoleConstants.js";
import { login } from "../controllers/LoginController.js";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
router.post("/register", verifyToken, authorize([ROLES.ADMIN]), registerAdmin);

export default router;
