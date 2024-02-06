import express from 'express';

import {
    getBook,
    getPage,
    saveImage
} from '../controller/books_controller.js';

const router = express.Router();


router.get('/:id/:page', getPage);

router.post('/saveImage', saveImage);

export default router;