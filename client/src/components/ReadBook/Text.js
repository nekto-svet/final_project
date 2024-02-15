import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {useSelector, useDispatch}  from 'react-redux';
import { 
    change_bg_color,
    postStyle,
    delete_drawing_history
} from "./interactionsSlice";
import { 
    fetchText, 
} from "./pagesSlise";
import Canvas from "./Canvas/Canvas";


const Text = () => {

    const params = useParams();
    let bookId = params.bookId;
    let page = params.page;

    const user_id = localStorage.getItem('user_id');
    // console.log ('from text user_id', user_id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const interactionsState = useSelector(state => state.interactions);

    const currStyle = interactionsState.style[page];

    const pageState = useSelector(state => state.pages);
    const text = pageState.text;
    // console.log (text)


    useEffect  (() => {
        // console.log('useEffect from Text');
        dispatch(fetchText({ bookId, page }))
    },[bookId, page]);


    const splitedText = text.split('\\n');
  
    // const targetWords = ['farmer', 'three little pigs', 'little pig', 'bad wolf'];

    // const handleWordClick = (word) => {
    //     console.log(`Clicked word: ${word}`);
    // };

    // const renderText = () => {
    //     const regex = new RegExp(`(${targetWords.join('|')})`, 'gi');
    //     const parts = text.split(regex);
    
    //     return parts.map((part, index) => {
    //       if (targetWords.includes(part.toLowerCase())) {
    //         return (
    //           <span key={index} onClick={() => handleWordClick(part)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
    //             {part}
    //           </span>
    //         );
    //       } else {
    //         return <span key={index}>{part}</span>;
    //       }
    //     });
    //   };

    const handleSaveSlyle = () => {
        let stringifiedStyle = JSON.stringify(interactionsState.style);
        dispatch(postStyle({user_id, book_id:bookId, style:stringifiedStyle}));
    }
    

    let bgColor = currStyle ? currStyle.bgColor : 'pink'
    return (
        <div style={{backgroundColor: bgColor}} position={'relative'}>
        <h1>Text</h1>
        <Canvas/>
        <div style={
            { position: 'absolute',
            userSelect: 'none',
            zIndex: '1',
            top: '200px', left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            textAlign:'left',
            }
            }>
                {splitedText.map((paragraph) => {
                return (
                    <>
                    <div>{paragraph}</div>
                    <br/>
                    </>
                )
            })}
            {/* {renderText(text)} */}
            </div>
        <br />
        <button onClick={() => dispatch(change_bg_color({page, color:'blue'}))}>Blue</button>
        <button onClick={handleSaveSlyle}>Save Changes</button>
        <button onClick={() => dispatch(delete_drawing_history(page))}>Remove Drawing</button>
        <div>
            <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Previous Page</button>
            <button onClick={() => navigate(`/book/${bookId}/${+page + 1}`)}>Next Page</button>
        </div>
        </div>
    );
};

export default Text;



// advice
//Make text another element
// Consider abstracting the canvas drawing logic into a custom hook (useCanvasDrawing for example) to clean up the component and make the logic reusable.

