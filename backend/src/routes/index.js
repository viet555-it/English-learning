import { Router } from "express";
import testRoute from "./testRoute.js";

const router = Router();

router.use("/test", testRoute);

export default router;