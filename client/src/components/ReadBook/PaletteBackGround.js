import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { change_bg_color } from "./interactionsSlice";
const PaletteBG = () => {
    const params = useParams();
    let page = params.page;
    const dispatch = useDispatch();

    //
    return (
        <div style={{display:'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            position:'absolute',
            width:'50px'}}>
            
            <div style={{
                width:'50px',
                height: '50px',
                margin: '5px',
                backgroundColor: 'lavender',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'lavender'}))}
                ></div>
            <div style={{
                width:'50px',
                height: '50px',
                margin: '5px',
                backgroundColor: 'lightyellow',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'lightyellow'}))}
                ></div>
            <div style={{
                width:'50px',
                height: '50px',
                margin: '5px',
                backgroundColor: 'lightblue',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'lightblue'}))}
                ></div>
            <div style={{
                width:'50px',
                height: '50px',
                margin: '5px',
                backgroundColor: 'lightcoral',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'lightcoral'}))}
                ></div>
             <div style={{
                width:'50px',
                height: '50px',
                margin: '5px',
                backgroundColor: 'lightgreen',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'lightgreen'}))}
                ></div>
                
        </div>
    )
};
export default PaletteBG;


// import React, { useState } from 'react';
// import { SwatchesPicker, CirclePicker } from 'react-color';

// function ColorPicker() {
//   const [color, setColor] = useState('#fff');

//   const handleChangeComplete = (color) => {
//     setColor(color.hex);
//   };

//   return (
//     <>
//         <div style={{ overflow: 'hidden' }}> {/* Adjust maxHeight as needed */}
//           <SwatchesPicker />
//         </div>

    // <div>
    //   <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
    //   <p>Selected Color: {color}</p>
    // </div>
//     </>
//   );
// }

// export default ColorPicker;