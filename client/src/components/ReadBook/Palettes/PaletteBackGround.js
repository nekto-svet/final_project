import '../Page.css'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { change_bg_color } from "../interactionsSlice";
const PaletteBG = () => {
    const params = useParams();
    let page = params.page;
    const dispatch = useDispatch();

   
    return (
        <div id='P_palette_parent'>
            
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#c4f8bc',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#c4f8bc'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#f4ff93',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#f4ff93'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#ffce9c',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#ffce9c'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#fdcece',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#fdcece'}))}
                ></div>
             <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#fdc8dd',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#fdc8dd'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#f6c3fb',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#f6c3fb'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#c1c0ff',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#c1c0ff'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#bff9ff',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#bff9ff'}))}
                ></div>
            <div className='palette' style={{
                width:'calc(20px + 1vw)',
                height: 'calc(20px + 1vw)',
                margin: '5px',
                backgroundColor: '#c0c1c2',
                }}
                onClick={() => dispatch(change_bg_color({page, color:'#c0c1c2'}))}
                ></div>
                
        </div>
    )
};
export default PaletteBG;
