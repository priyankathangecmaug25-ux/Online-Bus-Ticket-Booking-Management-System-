import express from "express";
import { registerUser } from "../controllers/UserController.js";
import { login } from "../controllers/LoginController.js";
import { verifyToken, authorize } from "../middlewares/VerifyToken.js";
import { ROLES } from "../constants/RoleConstants.js";
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", login);


router.get("/profile", verifyToken, authorize([ROLES.USER]), (req, res) => {
  res.send({ message: "Welcome user!", userId: req.user.userId });
});

export default router;
