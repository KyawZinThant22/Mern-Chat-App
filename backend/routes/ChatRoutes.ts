import { Router } from "express";
import { accessChat } from "../controller/ChatController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, accessChat)


export default router