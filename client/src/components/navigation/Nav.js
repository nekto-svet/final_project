import { useParams, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    return(
        <div>
            <button onClick={() => navigate(`/select`)}>Home</button>
            <button onClick={() => {localStorage.clear('token'); window.location.reload()}}>Log Out</button>
        </div>
    )
}

export default Nav;