import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch }  from 'react-redux';
import { 
  fetchStyle,
  create_new_style,
} from "./interactionsSlice";

import { fetchNumberOfPages } from "./pagesSlise";
import TitlePage from "./TitlePage/TitlePage";
import Text from "./Text";
import PaletteBG from "./PaletteBackGround";

const Page = () => {

  const params = useParams();
  let bookId = params.bookId;
  let page = params.page;
 
  const user_id = localStorage.getItem('user_id');

  const dispatch = useDispatch();

  // const stateInteractions = useSelector(state => state.interactions);//

  // const statePages = useSelector(state => state.pages);

//fetches number of pagees of the current book
// fetches previous style of the current book, if not creates a new style
  useEffect(() => {
    dispatch(fetchStyle({bookId, user_id})).then (style => {
      dispatch(fetchNumberOfPages(bookId)).then (number => {
        if (style.payload == undefined) {
          dispatch(create_new_style({pages: number.payload}));
        }
      });
      
    });
  }, []); 


  if (page == 0) {
    return (
      <div>
        <PaletteBG />
        <TitlePage/>
      </div>
    );
  } else {
    return (
      <div>
        <PaletteBG />
        <Text />
      </div>
    );
  }

}

export default Page;