import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createIllustration } from "./interactionsSlice";
// const baseURL = process.env.REACT_APP_BASE_URL || '';

const Illustration = (props) => {
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

   

    return (
        <div id='illustration_parent'>
            <button className='TP_navigate_text' id='illustration_button' onClick={() => dispatch(createIllustration({text, page}))}>Create an illustration!</button>
            <br/>
            {currStyle ? currStyle.illustration? <img id='illustration_img' width={500} src={currStyle.illustration} alt='cute illustration'/> : null :null}
        </div>
    )
}

export default Illustration;