import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createIllustration } from "./interactionsSlice";
// const baseURL = process.env.REACT_APP_BASE_URL || '';
import loading_icon from './loading_icon2.svg';
import { useState } from "react";
   


const Illustration = (props) => {
    const [loading, setLoading] = useState(false);
    const text = props.text;

    const params = useParams();
    let bookId = params.bookId;
    let page = params.page;
    // console.log ('page from illustr', page)
    const user_id = localStorage.getItem('user_id');
    // console.log ('from text user_id', user_id);

    const dispatch = useDispatch();
    const interactionsState = useSelector(state => state.interactions);
    const currStyle = interactionsState.style[page];

   const handleClickCreate = () => {
    setLoading(true);
    dispatch(createIllustration({text, page})).then(()=>{
        setTimeout(()=>{
            setLoading(false);
        }, 3000)
    })
   }

    return (
        <div id='illustration_parent'>
            <div className='TP_navigate_text' id='illustration_button'>CREATE AN ILLUSTRATION</div>
            <br/>
            <div style={{margin:'0 auto', position:'relative'}}>
                {loading?
                    <div id='P_loading_illustr'>
                        <div>I am drawing for you! 
                        Please, wait a bit.</div>
                        <img id='P_loading_img' src={loading_icon} alt='loading'/>
                    </div>
                    :null}
                {currStyle ? currStyle.illustration?
                <img className='illustration_img' src={currStyle.illustration} alt='cute illustration' onClick={handleClickCreate}/> :
                <div className='illustration_img' onClick={handleClickCreate}></div> 
                :null}
            </div>
        </div>
    )
}

export default Illustration;