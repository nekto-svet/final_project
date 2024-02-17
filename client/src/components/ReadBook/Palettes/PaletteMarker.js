import '../Page.css'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { change_stroke_color } from "../interactionsSlice";

const PaletteMarker = () => {
    const params = useParams();
    let page = params.page;
    const dispatch = useDispatch();

    return (
        <div>
        <div id='PM_palette_marker_parent'>
            
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#71f55d',
                }}
                onClick={() => dispatch(change_stroke_color({page, color: "#71f55d"}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#e2f256',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#e2f256'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#f5ae67',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#f5ae67'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#f98a8a',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#f98a8a'}))}
                ></div>
             <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#f96ba3',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#f96ba3'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#e559f2',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#e559f2'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#8886fd',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#8886fd'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#5fe3f2',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#5fe3f2'}))}
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
        <div id='PM_palette_marker_parent'>
            
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#369826',
                }}
                onClick={() => dispatch(change_stroke_color({page, color: "#369826"}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#c4b91a',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#c4b91a'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#cd6c0a',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#cd6c0a'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#dc3737',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#dc3737'}))}
                ></div>
             <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#da216b',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#da216b'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#a509b4',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#a509b4'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#3a37ea',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#3a37ea'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#25b8c8',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#25b8c8'}))}
                ></div>
            <div className='palette' style={{
                width:'30px',
                height: '30px',
                margin: '5px',
                backgroundColor: '#797a7a',
                }}
                onClick={() => dispatch(change_stroke_color({page, color:'#797a7a'}))}
                ></div>
                
        </div>
        </div>
    )
    
};
export default PaletteMarker;
