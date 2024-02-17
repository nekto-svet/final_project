import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createIllustration } from "../interactionsSlice";

const RenderText = ({setCharacter,setLoading, text}) => {
    const dispatch = useDispatch();
    const pageState = useSelector(state => state.pages);
    // const [loading, setLoading] = useState(false);

    const params = useParams();
    let page = params.page;

    const handleClickCreate = (text) => {
       setLoading(true);
       dispatch(createIllustration({text, page})).then(()=>{
           setTimeout(()=>{
               setLoading(false);
           }, 3000)
       })
      }

    // const handleWordClick = (word) => {
    //     setCharacter(word);
    //     console.log(`Clicked word: ${word}`);
    // };

    const targetWords = pageState.targetWords?pageState.targetWords.split(', '):'';
     // First, split the text by newline characters to handle them separately
     const lines = text.split('\\n');
     console.log('targetWords from renderText',targetWords=='');
     const regex =targetWords==''? '' : new RegExp(`(${targetWords.join('|')})`, 'gi');
         // Process each line with the original functionality and then insert <br /> tags between lines
     return lines.map((line, lineIndex) => (
       <div style={{
            fontSize:'calc(10px + 0.4vw)',
            // position: 'absolute',
            // userSelect: 'none',
            // zIndex: '1',
            // top: '200px', 
            // left: 'calc(10vw + 60px)',
            // // transform: 'translateX(-50%)',
            // width: 'calc(100px + 30vw)',
            // textAlign:'left',
            }} key={lineIndex}>
         {line.split(regex).map((part, index) => {
           if (targetWords.includes(part.toLowerCase())) {
             return (
               <span key={index} onClick={() => handleClickCreate(part)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>
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

export default RenderText;