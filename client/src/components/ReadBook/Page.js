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
// import Canvas from "./Canvas/Canvas";

const Page = () => {

  const params = useParams();
  let bookId = params.bookId;
  let page = params.page;
 
  const user_id = localStorage.getItem('user_id');

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
      });
      
    });
  }, []); 


  if (page == 0) {
    return (
      <div>
        <PaletteBG />
        <TitlePage/>
        {/* <Canvas/> */}
      </div>
    );
  } else {
    return (
      <div>
        <PaletteBG />
        <Text />
        {/* <Canvas/> */}
      </div>
    );
  }

}

export default Page;