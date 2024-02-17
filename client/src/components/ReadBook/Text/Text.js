import '../Page.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useSelector, useDispatch}  from 'react-redux';
import { postStyle } from '../interactionsSlice';
import { 
    fetchText, 
} from "../pagesSlise";
import Canvas from "../Canvas/Canvas";
import Illustrationtext from './IllustrationText';
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import Nav from '../../navigation/Nav';
import PaletteBG from '../Palettes/PaletteBackGround';
import PageNavigate from './PageNavigate';
import RenderText from './RenderText';

const Text = () => {

    const params = useParams();
    let bookId = params.bookId;
    let page = params.page;

    const user_id = localStorage.getItem('user_id');

    const dispatch = useDispatch();
    
    //pass here a name of a book?
    const [character, setCharacter] = useState('');

    const interactionsState = useSelector(state => state.interactions);

    const currStyle = interactionsState.style[page];

    const pageState = useSelector(state => state.pages);
    const text = pageState.text;
    // console.log (text)
    const [loading, setLoading] = useState(false);

    useEffect  (() => {
        // console.log('useEffect from Text');
        dispatch(fetchText({ bookId, page }))
    },[bookId, page]);


    const handleSaveSlyle = () => {
        let stringifiedStyle = JSON.stringify(interactionsState.style);
        dispatch(postStyle({user_id, book_id:bookId, style:stringifiedStyle}));
    }

    console.log ('from page number of page', pageState.numberOfPages);
    console.log(+page + 1)
    

    let bgColor = currStyle ? currStyle.bgColor : 'lightyellow'
    return (
        <div style={{backgroundColor: bgColor, minHeight:'100vh'}} position={'relative'} >
        <Nav/>
        <div style={{display:'flex', justifyContent:'space-around'}}>
          <PaletteBG/>
          <ErrorBoundary><Canvas/></ErrorBoundary>      

          <div style={{ 
            position: 'absolute',
            userSelect: 'none',
            zIndex: '1',
            top: '200px', 
            left: 'calc(10vw + 60px)',
            width: 'calc(100px + 30vw)',
            textAlign:'left',}}>
              <ErrorBoundary><RenderText 
              setLoading={setLoading}
              setCharacter={setCharacter} 
              text={text}/></ErrorBoundary>    
          </div>
          

          <div>
            <ErrorBoundary><Illustrationtext
            loading={loading}
            text = {character}/></ErrorBoundary>
            <button id='T_button_save' onClick={handleSaveSlyle}>Save Changes</button>
            <PageNavigate/>
          </div>
          
        </div>
       
        </div>
    );
};

export default Text;



// advice
//Make text another element
// Consider abstracting the canvas drawing logic into a custom hook (useCanvasDrawing for example) to clean up the component and make the logic reusable.

