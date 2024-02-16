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
import Illustration from "./Illustration";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const Text = () => {

    const params = useParams();
    let bookId = params.bookId;
    let page = params.page;

    const user_id = localStorage.getItem('user_id');
    // console.log ('from text user_id', user_id);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //pass here a name of a book?
    const [character, setCharacter] = useState('');

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
  
    const targetWords = pageState.targetWords?pageState.targetWords.split(', '):'';

    const handleWordClick = (word) => {
        setCharacter(word);
        console.log(`Clicked word: ${word}`);
    };

    // const renderText = () => {
    //     const regex = new RegExp(`(${targetWords.join('|')})`, 'gi');
    //     const parts = text.split(regex);
    
    //     return parts.map((part, index) => {
    //       if (targetWords.includes(part.toLowerCase())) {
    //         return (
    //           <span key={index} onClick={() => handleWordClick(part)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>
    //             {part}
    //           </span>
    //         );
    //       } else {
    //         return <span key={index}>{part}</span>;
    //       }
    //     });
    //   };

    const renderText = (text) => {
        // First, split the text by newline characters to handle them separately
        const lines = text.split('\\n');
        console.log('targetWords from renderText',targetWords=='');
        const regex =targetWords==''? '' : new RegExp(`(${targetWords.join('|')})`, 'gi');
      
        // Process each line with the original functionality and then insert <br /> tags between lines
        return lines.map((line, lineIndex) => (
          <div key={lineIndex}>
            {line.split(regex).map((part, index) => {
              if (targetWords.includes(part.toLowerCase())) {
                return (
                  <span key={index} onClick={() => handleWordClick(part)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>
                    {part}
                  </span>
                );
              } else {
                return <span key={index}>{part}</span>;
              }
            })}
            <br/>
          </div>
        ));
      };

    const handleSaveSlyle = () => {
        let stringifiedStyle = JSON.stringify(interactionsState.style);
        dispatch(postStyle({user_id, book_id:bookId, style:stringifiedStyle}));
    }
    
    const PageNavigate = () => {
      if (page == 1 ) {
        return(
          <div>
            <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Back to the Title Page</button>
            <button onClick={() => navigate(`/book/${bookId}/${+page + 1}`)}>Next Page</button>
        </div>
        )
      }
      else if (page == pageState.numberOfPages) {
        return(
          <div>
            <div>You ended this book!</div>
            <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Previous Page</button>
            <button onClick={() => navigate(`/select`)}>Select another book</button>
        </div>
        )
      }
      else if (page<0 || page>pageState.numberOfPages){
        navigate(`/book/${bookId}/0`)
      }
      else {
        return (
          <div>
            <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Previous Page</button>
            <button onClick={() => navigate(`/book/${bookId}/${+page + 1}`)}>Next Page</button>
          </div>
        )
      }
    }

    let bgColor = currStyle ? currStyle.bgColor : 'pink'
    return (
        <div style={{backgroundColor: bgColor}} position={'relative'}>
        <h1>Text</h1>
        <ErrorBoundary><Canvas/></ErrorBoundary>            
            <div style={
            { position: 'absolute',
            userSelect: 'none',
            zIndex: '1',
            top: '200px', left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            textAlign:'left',
            }}>{renderText(text)}</div>
            
        <br />
        <button onClick={() => dispatch(change_bg_color({page, color:'blue'}))}>Blue</button>
        <button onClick={handleSaveSlyle}>Save Changes</button>
        <button onClick={() => dispatch(delete_drawing_history(page))}>Remove Drawing</button>
        <PageNavigate/>
        <ErrorBoundary><Illustration text = {character}/></ErrorBoundary>
        </div>
    );
};

export default Text;



// advice
//Make text another element
// Consider abstracting the canvas drawing logic into a custom hook (useCanvasDrawing for example) to clean up the component and make the logic reusable.

