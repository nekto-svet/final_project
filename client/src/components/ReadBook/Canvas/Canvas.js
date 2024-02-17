import '../Page.css'
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    change_stroke_color,
    change_stroke_width,
    save_drawing_history, 
    delete_drawing_history,
} from "../interactionsSlice";
import { CirclePicker } from 'react-color';
import PaletteMarker from '../PaletteMarker';


const Canvas = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const bookId = params.bookId;
    const page = params.page;
    const curr_id = `${bookId}-${page}`;

    const canvasRef = useRef(null);

    const state = useSelector(state => state.interactions);
    const currStyle = state.style[page];
    
    // console.log('style from canvas', state);
    // console.log('currStyle from canvas', currStyle);
    const [isDrawing, setIsDrawing] = useState(false);
    const savedDrawing = currStyle?currStyle.drawingHistory:null;
    const currStrokeColor = state.style.length == 0? 'black' : state.style[page].strokeColor;
    const currStrokeWidth = state.style.length == 0? 1 : state.style[page].strokeWidth;

    const canvas_width = Math.max(window.innerWidth * 0.5, 600); 
    const canvas_height = (canvas_width * 3) / 4; 

     // restore previous drowing on a canvas
    useEffect(() => {
        // updateCanvasSize();
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (savedDrawing) {
        base64ToCanvas(canvas, savedDrawing);
        }
    
    }, [bookId, page, base64ToCanvas]); 
    

     //  DRAW
    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return; 
        const context = canvas.getContext("2d");
        
        const strokeColor = state.style[page]? state.style[page].strokeColor : 'black'; 
        const strokeWidth = state.style[page]? state.style[page].strokeWidth : 1;

        const startDrawing = (e) => {
        setIsDrawing(true);
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        console.log('strokeWidth', strokeWidth)
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;
        console.log ('context.lineWidth', context.lineWidth)
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
    }, [currStrokeColor, currStrokeWidth,isDrawing, params, currStyle]);


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

 //width={800} height={600}
    return (
        <>
            <div style={{display:'flex'}}>
                <canvas ref={canvasRef} width={canvas_width} height={canvas_height}  />
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                    <input
                        type="range"
                        value={currStrokeWidth}
                        onChange={(e) => dispatch(change_stroke_width({page, width: parseFloat(e.target.value)}))}
                        min="0.5"
                        max="10"
                        step="0.1"
                        style={{transform: 'rotate(-90deg)'}}
                    />
                    <PaletteMarker/>
                </div>
            </div>
        <button onClick={() => dispatch(delete_drawing_history(page))}>Remove Drawing</button>

        </>
    )
}

export default Canvas;