import './BookSelection.css'
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from '../navigation/Nav';
import CoolText from './CoolText';
import loading_icon from './loading_icon2.svg';
const baseURL = process.env.REACT_APP_BASE_URL || '';

const BookSelection = () => {
    

    const [allBooks, setAllBooks] = useState([]);
    const [bookCovers, setBookCovers] = useState([]);
    const [loading, setLoading] = useState([]);
    const navigate = useNavigate();

    const user_id = localStorage.getItem('user_id');

    const fetchAllBooks = async() => {
        console.log('fetched books');
        
        try {
            const res = await axios.get(`${baseURL}/books/all_books`);
            const newBookCovers = res.data.map(book => book.cover_img);
            console.log('newBookCovers', newBookCovers);
            setBookCovers(newBookCovers);
            setAllBooks(res.data);
        } catch (err) {
            console.log(err);
          }
      };

    const createCover = async (index, title, id) => {
        console.log('createCover');
        setLoading((loading)=>{
            const newLoading = [...loading, id];
            return newLoading;
        });

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
            setBookCovers(bookCovers => {
                const updatedCovers = [...bookCovers];
                updatedCovers[index] = res.data.URL;
                return updatedCovers;
            });
            setTimeout(()=>{
                setLoading((currentLoading) => {
                    return currentLoading.filter(item => item !== id);
                });
            }, 7000)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllBooks().then(() => {

        })
    }, []);


    return (
        <div id='BS'>
        <Nav/>
        <div id='BS_header'>
            <CoolText text = {'Select a book that you want to read today!'}/>
        </div>
        <div>{allBooks.map((book, index) => {
            return (
                <div className='BS_entire_book'
                id={`BS_entire_book_${book.book_id}`}
                key={book.book_id}>
                    
                    <div id='BS_book'
                    onClick={() => navigate(`/book/${book.book_id}/0`)}>
                        <div id='BS_book_title'>{book.title}</div>
                        <img id='BS_book_img' 
                        src={bookCovers[index]?bookCovers[index]:null} alt={book.title}/>
                        {loading.includes(book.book_id)?
                        <div id='SB_loading'>
                            <div>I am drawing a new cover for you! 
                            Please, wait a bit.</div>
                            <img src={loading_icon} alt='loading'/>
                        </div>
                        :null}

                    </div>
                    <button 
                    id='BS_book_button'
                    onClick={()=>createCover(index, book.title, book.book_id)}>Click here to create a new cover!</button>
                </div>
            )
        })}</div>
        </div>
    )
}

export default BookSelection;