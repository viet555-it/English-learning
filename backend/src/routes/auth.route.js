import { Router } from "express";
import { validateRegisterInput } from "../middlewares/validateAuth.js";
import { register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateRegisterInput, register);

export default router;
