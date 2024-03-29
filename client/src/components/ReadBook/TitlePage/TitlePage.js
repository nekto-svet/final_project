import '../Page.css';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { fetchBookData } from '../pagesSlise';
import { postStyle, delete_drawing_history } from "../interactionsSlice";
import { useEffect, useRef } from "react";
import Canvas from "../Canvas/Canvas";
import Illustration from "../Illustration";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import Nav from '../../navigation/Nav';
import PaletteBG from '../Palettes/PaletteBackGround';

const TitlePage = () => {
    const navigate = useNavigate();
    const pageToNavigate = useRef();

    const params = useParams();
    let page = params.page;
    let book_id = params.bookId;

    const dispatch = useDispatch();

    const interactionsState = useSelector(state => state.interactions);
    const currStyle = interactionsState.style[page];
    console.log ('from Text currStyle', currStyle);

    const pagesState = useSelector(state => state.pages);
    const currBookInfo = pagesState.bookData;
    pagesState.numberOfPages?console.log('numberOfPages',pagesState.numberOfPages):console.log('')

    const user_id = localStorage.getItem('user_id');
    // console.log ('from text user_id', user_id);


    
    // fetches info about book for display it on a title page
    useEffect (() => {
        // console.log ('mount TitlePage')
        dispatch(fetchBookData({book_id}))
    }, []);

    const pageOptions = () => {
        let options = [];
        for (let i = 1; i <= pagesState.numberOfPages; i++) {
          options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    const handleNavigate = () => {
        const selectedPage = pageToNavigate.current.value;
        if (selectedPage) {
          navigate(`/book/${book_id}/${selectedPage}`);
        }
    };
    
    const bgColor = currStyle ? currStyle.bgColor : 'lightyellow'
    return (
        <div id='TP_parent' style={{backgroundColor: bgColor, minHeight:'100vh', paddingTop:'5px'}} >
            <Nav/>
            <div id='TP_header'>{currBookInfo.title}</div>
            
            
            <div id='TP_canvas_ill_parent'> 

                <PaletteBG/>

                <div id='canvas_parent'>
                    
                    <div className='TP_navigate_text' id='TP_text_draw'>DRAW!</div>
                    <Canvas/>
                </div>

                <div style={{marginLeft:'1vw'}}>
                    <div id='TP_navigate'>
                        <div>
                            <div className='TP_navigate_text' id='TP_navigate_text_read'>READ</div>
                            <button onClick={() => navigate(`/book/${book_id}/1`)}>from the beginning</button>
                        </div>
                        
                        <div style={{display:'flex'}}>
                            <div className='TP_navigate_text'>or</div>  
                            <select ref={pageToNavigate}>
                                <option>from page.</option>
                                {pagesState.numberOfPages && pageOptions()}
                            </select>
                            <button onClick={handleNavigate}> Go to the selected page!</button>
                        </div>
                    </div>
                    <div>

                    </div>
                    <ErrorBoundary><Illustration text = {currBookInfo.title}/></ErrorBoundary>
                </div>
                
            </div>
            
        </div>
    )
}

export default TitlePage;
