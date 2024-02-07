import express from 'express';

import {
    getBook,
    getPage,
    getState,
    saveImage
} from '../controller/books_controller.js';

const router = express.Router();


router.get('/text/:bookId/:page', getPage);
router.get('/state/:bookId', getState);

router.post('/saveImage', saveImage);

export default router;