import { useNavigate } from "react-router-dom";

// navigate('/');
const First = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div>Home</div>
            <div>
            
                <button onClick={() => navigate('/register')}>Sign Up</button>
                <button onClick={() => navigate('/login')}>Log In</button>
            </div>
        </div>
    )
};

//
export default First;