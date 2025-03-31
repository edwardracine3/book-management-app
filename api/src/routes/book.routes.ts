import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { 
  getBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers';
import { upload } from '../utils';

const router = express.Router();

// Force All book routes require authentication
// only login user can have access
router.use(authenticate);

// Books routes
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', upload.single('coverImage'), createBook);
router.put('/:id', upload.single('coverImage'), updateBook);
router.delete('/:id', deleteBook);

//TO-DO
// router.delete('/bulk/:id', deleteBulkBook);

export default router;