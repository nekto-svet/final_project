import './Page.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch }  from 'react-redux';
import { 
  fetchStyle,
  create_new_style,
} from "./interactionsSlice";

import { 
  fetchNumberOfPages,
  fetchTargetWords,
 } from "./pagesSlise";
 
import TitlePage from "./TitlePage/TitlePage";
import Text from "./Text/Text";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const Page = () => {

  const params = useParams();
  let bookId = params.bookId;
  let page = params.page;
 
  const user_id = localStorage.getItem('user_id');

  const interactionsState = useSelector(state => state.interactions);
  console.log('all style from page', interactionsState);

  const dispatch = useDispatch();


//fetches number of pagees of the current book
// fetches previous style of the current book, if not creates a new style
  useEffect(() => {
    console.log ('mount parent Page');
    dispatch(fetchStyle({bookId, user_id})).then (style => {
      dispatch(fetchNumberOfPages(bookId)).then (number => {
        if (style.payload == undefined) {
          dispatch(create_new_style({pages: number.payload}));
        }
        dispatch(fetchTargetWords(bookId));
      });
      
    });

    // return () => {;
    //   console.log('a am living a page');
    //   let stringifiedStyle = JSON.stringify(interactionsState.style);
    //   dispatch(postStyle({user_id, book_id:bookId, style:stringifiedStyle}));
    // };
  }, []);


  if (page == 0) {
    return (
      <>
        <ErrorBoundary><TitlePage/></ErrorBoundary>
      </>
    );
  } else {
    return (
      <>
        <ErrorBoundary><Text /></ErrorBoundary>
      </>
    );
  }

}

export default Page;