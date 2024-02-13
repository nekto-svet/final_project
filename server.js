import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import books_router from'./router/books_router.js';
import users_router from './router/users_router.js'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '100mb' }));

app.use(express.urlencoded({ 
  limit: '100mb', 
  extended: true,
  parameterLimit: 100000
}));

app.use (cookieParser());


app.listen(process.env.PORT || 3001, ()=> {
    console.log(`run on server ${process.env.PORT || 3001}`)
});

app.use('/', users_router);
app.use('/books', books_router);
app.use('/images', express.static('images'));