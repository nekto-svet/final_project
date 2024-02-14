import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const BookSelection = () => {

    const [allBooks, setAllBooks] = useState([]);
    const navigate = useNavigate();

    const user_id = localStorage.getItem('user_id');

    const fetchAllBooks = async() => {
        try {
            const res = await axios.get('http://localhost:3001/books/all_books');
            setAllBooks(res.data);
        } catch (err) {
            console.log(err);
          }
      };

    useEffect(() => {
        fetchAllBooks();
    }, [])

    return (
        <div>
        <div>Select a book!</div>
        <div>{allBooks.map(book => {
            return (
                <button 
                onClick={() => navigate(`/book/${book.book_id}/0`)}
                key={book.book_id}>
                    <img width={'300px'} src={book.cover_img} alt={book.title}/>
                    <div>{book.title}</div>
                    <div>{book.author?book.author:null}</div>
                    <div>{book.year?book.year:null}</div>
                </button>
            )
        })}</div>
        </div>
    )
}

export default BookSelection;