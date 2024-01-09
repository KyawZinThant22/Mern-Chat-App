import { Router } from 'express';
import { accessChat, createGroupChat, fetchChats, renameGroupChat } from '../controller/ChatController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, accessChat);
router.get('/', protect, fetchChats);
router.post('/group', protect, createGroupChat);
router.put('/group/rename' , protect , renameGroupChat)

export default router;
