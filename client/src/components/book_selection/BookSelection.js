import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL || '';

const BookSelection = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [bookCovers, setBookCovers] = useState([])
    const navigate = useNavigate();
    console.log ('bookCovers', bookCovers)

    const user_id = localStorage.getItem('user_id');

    const fetchAllBooks = async() => {
        console.log('fetched books');
        try {
            const res = await axios.get(`${baseURL}/books/all_books`);
            setAllBooks(res.data);
        } catch (err) {
            console.log(err);
          }
      };

    const createCover = async (index, title) => {
        console.log('createCover');
        const prompt = title + ' cute illustration for children book in pastel colors'
        try {
            const res = await axios.post(`${baseURL}/illustrations`, 
                { prompt },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log (res.data);
            // return res.data
            setBookCovers(bookCovers => {
                const updatedCovers = [...bookCovers];
                updatedCovers[index] = res.data.URL;
                return updatedCovers;
            })
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllBooks().then(() => {
            const newBookCovers = allBooks.map(book => book.cover_img);
            setBookCovers(newBookCovers);
        })
    }, [])

    return (
        <div>
        <div>Select a book!</div>
        <div>{allBooks.map((book, index) => {
            return (
                <div key={book.book_id}>
                    <button onClick={()=>createCover(index, book.title)}>Click to create a new cover!</button>
                <button 
                onClick={() => navigate(`/book/${book.book_id}/0`)}>
                    <img width={'300px'} src={bookCovers[index]?bookCovers[index]:null} alt={book.title}/>
                    <div>{book.title}</div>
                    <div>{book.author?book.author:null}</div>
                    <div>{book.year?book.year:null}</div>
                </button>
                </div>
            )
        })}</div>
        </div>
    )
}

export default BookSelection;