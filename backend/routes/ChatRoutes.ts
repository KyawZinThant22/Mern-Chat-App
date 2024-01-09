import { Router } from 'express';
import {
   accessChat,
   createGroupChat,
   fetchChats,
   removeFromChat,
   renameGroupChat,
} from '../controller/ChatController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, accessChat);
router.get('/', protect, fetchChats);
router.post('/group', protect, createGroupChat);
router.put('/group/rename', protect, renameGroupChat);
router.put('/group/remove', protect, removeFromChat);

export default router;
