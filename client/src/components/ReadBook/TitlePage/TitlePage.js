import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { fetchBookData } from '../pagesSlise';
import { postStyle, delete_drawing_history } from "../interactionsSlice";
import { useEffect } from "react";
import Canvas from "../Canvas/Canvas";
import Illustration from "../Illustration";

const TitlePage = () => {
    const navigate = useNavigate();

    const params = useParams();
    let page = params.page;
    let book_id = params.bookId;

    const dispatch = useDispatch();

    const interactionsState = useSelector(state => state.interactions);
    const currStyle = interactionsState.style[page];
    console.log ('from Text currStyle', currStyle);

    const pagesState = useSelector(state => state.pages);
    const currBookInfo = pagesState.bookData;


    const user_id = localStorage.getItem('user_id');
    // console.log ('from text user_id', user_id);


    
    // fetches info about book for display it on a title page
    useEffect (() => {
        // console.log ('mount TitlePage')
        dispatch(fetchBookData({book_id}))
    }, []);

    
    const bgColor = currStyle ? currStyle.bgColor : 'pink'
    return (
        <div style={{backgroundColor: bgColor, height:'100vh'}} >
            <div>Welcome to the book "{currBookInfo.title}"!</div>
            <div><button onClick={() => navigate(`/book/${book_id}/1`)}>Read from the beginning!</button></div>
            <Canvas/>
            <button onClick={() => dispatch(delete_drawing_history(page))}>Remove Drawing</button>
            <Illustration text = {currBookInfo.title}/>
        </div>
    )
}

export default TitlePage;
