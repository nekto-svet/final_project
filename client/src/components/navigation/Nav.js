import './Nav.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

const Nav = React.memo (() => {
    const navigate = useNavigate();
    return(
        <div id='N_nav'>
            <div id='N_header'>MAGIC PAGES</div>
            <div id='N_buttons'>
                <button onClick={() => navigate(`/select`)}>Select Book</button>
                <button onClick={() => {localStorage.clear('token'); window.location.reload()}}>Log Out</button>
            </div>
        </div>
    )
});

export default Nav;