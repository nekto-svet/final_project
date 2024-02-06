import express from 'express';
// import dotenv from 'dotenv;'
import cors from 'cors';
import books_router from'./router/books_router.js';

const app = express();
app.use(cors());
app.use (express.urlencoded({extended:true}));
app.use(express.json());

app.use ('/books', books_router)

app.listen(process.env.PORT || 3001, ()=> {
    console.log(`run on server ${process.env.PORT || 3001}`)
})