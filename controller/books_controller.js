import { json } from 'express';
import { writeFile } from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();
import { 
    __getBook,
}  from '../models/books_models.js'

// const getAllBooks = (req, res) => {
//     __getAllBooks().then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.log(err);
//         res.status(404).json({msg:'not found'})
//     });
// }

export const getBook = async(req, res) => {
    const {id} = req.params;
    try{
        const book = await __getBook(id);
        res.json(book);
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}


// for example on a page will be 5 sentenses
const numberOfSentences = 5;

// pages start from 1, not from 0

export const getPage = async(req, res) => {
    // console.log(req.params);
    const {id, page} = req.params;
    console.log(req.params)
    let currentSentenses = [];
    try{
        const response = await __getBook(id);
        const text = response.text;
        const sentences = text.split('.');
        console.log(sentences.length);
        console.log(Math.ceil(sentences.length/numberOfSentences));
        console.log(page > Math.ceil(sentences.length/numberOfSentences))
        if (page > Math.ceil(sentences.length/numberOfSentences)) return res.send({msg:'end of the book'});
        for (let i=0; i<numberOfSentences; i++){
            // sentences[(page-1)*numberOfSentences+i] += `${(page-1)*numberOfSentences+i}`
            currentSentenses.push(sentences[(page-1)*numberOfSentences+i]); //0*5+0,1,2,3,4
        }
        const currText = currentSentenses.join('.') + '.'
        // const jsonText = JSON.stringify(pageText)
        // console.log(currText);
        res.send({currText});
    }
    catch (err){
        console.log(err);
        res.status(404).json({msg:'not found'})
    }
}


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
