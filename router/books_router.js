import express from 'express';
// import { verifytoken } from '../middlewares/verifyToken.js';

import {
    getAllBooks,
    getBook,
    getPages,
    getCountOfPages,
    getStyle,
    saveStyle,
    // getState,
    saveImage
} from '../controller/books_controller.js';

const router = express.Router();


router.get('/text/:bookId/:page', getPages);
// router.get('/state/:bookId', getState);
router.get('/all_books', getAllBooks);
router.get('/:bookId', getBook);
router.get('/pages/:bookId', getCountOfPages);
router.get('/style/:bookId/:user_id', getStyle)
router.post('/style', saveStyle)

router.post('/saveImage', saveImage);

export default router;