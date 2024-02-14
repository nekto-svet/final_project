import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    change_stroke_color,
    change_stroke_width,
    save_drawing_history, 
} from "../interactionsSlice";
import { CirclePicker } from 'react-color';


const Canvas = () => {
    const dispatch = useDispatch();

    const params = useParams();
    let bookId = params.bookId;
    let page = params.page;
    const curr_id = `${bookId}-${page}`;

    const canvasRef = useRef(null);

    const state = useSelector(state => state.interactions);
    const currStyle = state.style[page];
    const savedDrawing = currStyle?currStyle.drawingHistory:null;
    // console.log('style from canvas', state);
    // console.log('currStyle from canvas', currStyle);
    const [isDrawing, setIsDrawing] = useState(false);
    const currStrokeColor = state.style.length == 0? 'black' : state.style[page].strokeColor;
    const currStrokeWidth = state.style.length == 0? 1 : state.style[page].strokeWidth;

     // restore previous drowing on a canvas
    useEffect(() => {
        // console.log('restore prev drawing from canvas');
        const canvas = canvasRef.current;
        if (!canvas) return; // Ensure canvas exists
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        // const savedDrawing = currStyle?currStyle.drawingHistory:null;
        // console.log('savedDrawing from canvas', savedDrawing);
        if (savedDrawing) {
        base64ToCanvas(canvas, savedDrawing);
        }
    
    }, [bookId, page, base64ToCanvas]); 
    

     //  DRAW
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const context = canvas.getContext("2d");
        
        const strokeColor = state.style.length == 0? 'black' : state.style[page].strokeColor; 
        const strokeWidth = state.style.length == 0? 1 : state.style[page].strokeWidth;
        // console.log ('strokeColor', strokeColor);
        // console.log ('strokeColor',state.style[page].strokeColor);

        const startDrawing = (e) => {
        setIsDrawing(true);
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;
        };
    
        const draw = (e) => {
        if (!isDrawing) return;
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        };
    
        const stopDrawing = () => {
        setIsDrawing(false);
        context.closePath();
    
        //   convert the canvas content to Base64 and dispatch the action
        imageDataToBase64(canvas, (base64Image) => {
            if (currStyle) {
                dispatch(save_drawing_history({page, currId: curr_id, imageData: base64Image }));
            }
            // console.log('Base64 image data', base64Image);
        });
        };
    
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);
    
        return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseout", stopDrawing);
        };
    }, [currStrokeColor, currStrokeWidth,isDrawing, params]);


     //function to convert image data to to a Data URL (Base64)
    //The non-serializable value (an instance of ImageData, which contains a Uint8ClampedArray for pixel data ) cannot be serialized to JSON.
    function imageDataToBase64(canvas, callback) {
        const dataURL = canvas.toDataURL();
        callback(dataURL);
    }

    //function to get back image info from base64
    function base64ToCanvas(canvas, base64Image) {
        const context = canvas.getContext("2d");
        const image = new Image();
        // console.log ('from base64ToCanvas context', context, 'image', image);
        image.onload = function() {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    
        image.src = base64Image;
    }

 
    return (
        <>
        <canvas ref={canvasRef} width={800} height={400} style={{ border: "1px solid #000",}} />
        <div>
        <CirclePicker color={currStrokeColor} onChangeComplete={(color) => dispatch(change_stroke_color({page, color: color.hex}))} />
        {/* <p>Selected Color: {currStrokeColor}</p> */}
        <input
            type="range"
            value={currStrokeWidth}
            onChange={(e) => dispatch(change_stroke_width({page, width: parseFloat(e.target.value)}))}
            min="0.5"
            max="10"
            step="0.1"
        />
        </div>

        </>
    )
}

export default Canvas;