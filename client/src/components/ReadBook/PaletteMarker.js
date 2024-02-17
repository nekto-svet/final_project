import './Page.css'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { change_stroke_color } from "./interactionsSlice";

const PaletteMarker = () => {
    const params = useParams();
    let page = params.page;
    const dispatch = useDispatch();

    return (
        <div id='PM_palette_marker_parent'>
            
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#a0ca9a',
                }}
                onClick={() => dispatch(change_stroke_color({page, color: "#a0ca9a"}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#d1d890',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#d1d890'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#e8c49f',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#e8c49f'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#ebb4b4',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#ebb4b4'}))}
                ></div>
             <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#e1adc2',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#e1adc2'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#d1a8d5',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#d1a8d5'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#aeadec',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#aeadec'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#a1e1e8',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#a1e1e8'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#c0c1c2',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#c0c1c2'}))}
                ></div>
                
        </div>
    )
    
};
export default PaletteMarker;
