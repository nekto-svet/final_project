import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './First.css';

const First = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const strokeColor = '#6974c4'; 
    const strokeWidth = 5;

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    const startDrawing = useCallback((e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setIsDrawing(true);
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;
    }, [strokeColor, strokeWidth]);

    const draw = useCallback((e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
    }, [isDrawing, strokeColor, strokeWidth]);

    const stopDrawing = useCallback(() => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.closePath();
    }, [isDrawing]);

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

    return (
        <div id='F_parent'>
            <div id='F_title'>WELCOME TO THE MAGIC PAGES</div>
            <br/>
            <div id='F_buttons'>
                <button onClick={() => navigate('/register')}>Sign Up</button>
                <button onClick={() => navigate('/login')}>Log In</button>
            </div>
            <canvas id='F_canvas' ref={canvasRef}/>
        </div>
    )
};

export default First;