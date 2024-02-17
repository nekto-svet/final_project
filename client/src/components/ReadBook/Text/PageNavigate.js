import { useParams, useNavigate } from "react-router-dom"
import {useSelector}  from 'react-redux';
const PageNavigate = () => {
    const params = useParams();
    let bookId = params.bookId;
    let page = params.page;
    const navigate = useNavigate();

    const pageState = useSelector(state => state.pages);
    if (page == 1 ) {
      return(
        <div id='T_navigate'>
          <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Back to the Title Page</button>
          <button onClick={() => navigate(`/book/${bookId}/${+page + 1}`)}>Next Page</button>
      </div>
      )
    }
    else if (page == pageState.numberOfPages) {
      return(
        <div id='T_navigate'>
          <div>You ended this book!</div>
          <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Previous Page</button>
          <button onClick={() => navigate(`/select`)}>Select another book</button>
      </div>
      )
    }
    else if (+page<0 || +page>+pageState.numberOfPages){
      navigate(`/book/${bookId}/0`)
    }
    else {
      return (
        <div id='T_navigate'>
          <button onClick={() => navigate(`/book/${bookId}/${+page - 1}`)}>Previous Page</button>
          <button onClick={() => navigate(`/book/${bookId}/${+page + 1}`)}>Next Page</button>
        </div>
      )
    }
  };

export default PageNavigate;