import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    change_stroke_width,
    save_drawing_history, 
    delete_drawing_history,
    postStyle
} from "../interactionsSlice";
import PaletteMarker from '../Palettes/PaletteMarker';

const Canvas = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const bookId = params.bookId;
    const page = params.page;
    const user_id = localStorage.getItem('user_id');
    const curr_id = `${bookId}-${page}`;

    const canvasRef = useRef(null);

    const state = useSelector(state => state.interactions);
    const currStyle = state.style[page];

    const [isDrawing, setIsDrawing] = useState(false);
    const savedDrawing = currStyle ? currStyle.drawingHistory : null;
    const currStrokeColor = state.style.length === 0 ? 'black' : state.style[page].strokeColor;
    const currStrokeWidth = state.style.length === 0 ? 1 : state.style[page].strokeWidth;

    const canvas_width = Math.max(window.innerWidth * 0.5, 400); 
    const canvas_height = (canvas_width * 3) / 4; 

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (savedDrawing) {
            base64ToCanvas(canvas, savedDrawing);
        }
    }, [bookId, page, savedDrawing]); 

    const startDrawing = useCallback((e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setIsDrawing(true);
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.strokeStyle = currStrokeColor;
        context.lineWidth = currStrokeWidth;
    }, [currStrokeColor, currStrokeWidth]);

    const draw = useCallback((e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
    }, [isDrawing, currStrokeColor, currStrokeWidth]);

    const stopDrawing = useCallback(() => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.closePath();
        imageDataToBase64(canvas, (base64Image) => {
            if (currStyle) {
                dispatch(save_drawing_history({ page, currId: curr_id, imageData: base64Image }));
            }
        });
    }, [curr_id, currStyle, dispatch, isDrawing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 

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
    }, [startDrawing, draw, stopDrawing]);

    function imageDataToBase64(canvas, callback) {
        const dataURL = canvas.toDataURL();
        callback(dataURL);
    }

    function base64ToCanvas(canvas, base64Image) {
        const context = canvas.getContext("2d");
        const image = new Image();
        image.onload = function() {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = base64Image;
    }

    const handleSaveSlyle = () => {
        let stringifiedStyle = JSON.stringify(state.style);
        dispatch(postStyle({user_id, book_id: bookId, style: stringifiedStyle}));
    };

    return (
        <div style={{display: 'flex'}}>
            <div style={{display: 'inline-block', margin: '0px'}} width={canvas_width}>
                <canvas ref={canvasRef} width={canvas_width} height={canvas_height} />
                <br />
                <button id='C_buttom_remove' onClick={() => dispatch(delete_drawing_history(page))}>Remove Drawing</button>
                <button id='T_button_save' onClick={handleSaveSlyle}>Save Changes</button>
            </div>
            <div id='C_palette_size_marker' height={canvas_height}>
                <input id='C_size_marker'
                    type="range"
                    value={currStrokeWidth}
                    onChange={(e) => dispatch(change_stroke_width({ page, width: parseFloat(e.target.value) }))}
                    min="0.5"
                    max="20"
                    step="0.1"
                />
                <PaletteMarker/>
            </div>
        </div>
    );
};

export default Canvas;