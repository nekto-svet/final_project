import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import books_router from'./router/books_router.js';
import users_router from './router/users_router.js'
import cookieParser from "cookie-parser";
dotenv.config();
import * as path from 'path';
console.log (path);
const __dirname = 'https://interactive-reader.onrender.com';

const app = express();
app.use(cors()); //{origin:'http://localhost:3000', credentials:true}

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

//this two lines should be at the botton
// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });