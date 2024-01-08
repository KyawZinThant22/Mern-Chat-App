import { Router } from "express";
import { accessChat, fetchChats } from "../controller/ChatController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, accessChat)
router.get("/", protect,fetchChats)


export default router