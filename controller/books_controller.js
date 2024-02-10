import { json } from 'express';
import { writeFile } from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();
import { 
    __getAllBooks,
    __getBook,
    __getPages,
    __getCountOfPages,
    __getStyle,
    __saveStyle
    // __getState,
}  from '../models/books_models.js'

export const getAllBooks = (req, res) => {
    __getAllBooks().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(404).json({msg:'not found'})
    });
}

export const getBook = async(req, res) => {
    const {bookId} = req.params;

    try{
        const book = await __getBook(bookId);
        res.json(book[0]);
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}

export const getPages = async(req, res) => {
    const {bookId, page} = req.params;
    try{
        const pages = await __getPages(bookId, page);
        res.json(pages);
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}

export const getCountOfPages = async(req, res) => {
    const {bookId} = req.params;
    try{
        const pages = await __getCountOfPages(bookId);
        res.json(pages);
        // [
        //     {
        //         "count": "10"
        //     }
        // ]
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}


export const getStyle = async(req, res) => {
    const {bookId, user_id} = req.params;
    try{
        const style = await __getStyle(bookId, user_id);
        res.json(style);
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}

export const saveStyle = async(req, res) => {
    const { user_id, book_id, style } = req.body;
    // console.log ('from save style', user_id, book_id, style)
    try{
        await __saveStyle(user_id, book_id, style);
        res.status(200).json({msg:'style updated successfully'});
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}
// // for example on a page will be 5 sentenses
// const numberOfSentences = 5;

// // pages start from 1, not from 0

// export const getPage = async(req, res) => {
//     console.log('params from getPage',req.params);
//     const {bookId, page} = req.params;
//     // console.log(req.params)
//     let currentSentenses = [];
//     try{
//         const response = await __getBook(bookId);
//         const text = response.text;
//         const sentences = text.split('.');
//         console.log(sentences.length);
//         console.log(Math.ceil(sentences.length/numberOfSentences));
//         console.log(page > Math.ceil(sentences.length/numberOfSentences))
//         if (page > Math.ceil(sentences.length/numberOfSentences)) return res.send({msg:'end of the book'});
//         for (let i=0; i<numberOfSentences; i++){
//             // sentences[(page-1)*numberOfSentences+i] += `${(page-1)*numberOfSentences+i}`
//             currentSentenses.push(sentences[(page-1)*numberOfSentences+i]); //0*5+0,1,2,3,4
//         }
//         const currText = currentSentenses.join('.') + '.'
//         // const jsonText = JSON.stringify(pageText)
//         // console.log(currText);
//         res.send({currText});
//     }
//     catch (err){
//         console.log(err);
//         res.status(404).json({msg:'not found'})
//     }
// }


// export const getState = async(req, res) => {
//     const {bookId, page} = req.params;
//     // console.log(req.params);
//     // let currentSentenses = [];
//     try{
//         const response = await __getState(bookId);
//         // console.log(response);
//         // const state = response.state;
//         const currState = response[`${bookId}-${page}`];
//         console.log(currState);
//         res.send({currState});
//     }
//     catch (err){
//         console.log(err);
//         res.status(404).json({msg:'not found'})
//     }
// }

// export const getState = async(req, res) => {
//     const {bookId} = req.params;
//     console.log('params from getState',req.params);
//     // let currentSentenses = [];
//     try{
//         const state = await __getState(bookId);
//         // console.log(response);
//         // const state = response.state;
//         // const currState = response[`${bookId}-${page}`];
//         // console.log(currState);
//         res.send({state});
//     }
//     catch (err){
//         console.log(err);
//         res.status(404).json({msg:'not found'})
//     }
// }


// save images to images\
export const saveImage = async(req, res) => {
    const { imageDataUrl } = req.body;
    const base64Data = imageDataUrl.replace(/^data:image\/png;base64,/, '');
    const filename = `image_${Date.now()}.png`;
    const filePath = path.join(__dirname, 'images', filename);
    try {
      const buffer = Buffer.from(base64Data, 'base64');
  
      await writeFile(filePath, buffer);
  
      console.log('Image saved successfully:', filename);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).json({ error: 'Error saving image' });
    }
  };
