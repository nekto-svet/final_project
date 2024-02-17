'./RegistrLogin.css'
import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
const baseURL = process.env.REACT_APP_BASE_URL || '';
axios.defaults.withCredentials = true; 

const Login = ({action}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');

    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async() => {
        try{
            const response = await axios.post(`${baseURL}/login`  , {
                email, password 
            });
            if (response.status === 200) {
                // console.log('from login client',response.status, response.data)
                setToken(response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                localStorage.setItem('token', response.data.token);
                setMessage('');
                navigate(`/select`); 
            }
        }
        catch(err){
            console.log(err);
            setMessage(err.response.data.msg);
        }
    }


    return(
        <div id='RL_body'>
         <div id='RL_title'>Login</div>
        <div id ='RL_input'>
            <input
            id='email'
            type='email'
            label='Enter your email'
            placeholder='Enter your email'
            onChange={(e)=> setEmail(e.target.value)}
            />
            <input
            id='password'
            type='password'
            label='Enter your password'
            placeholder='Enter your password'
            onChange={(e)=> setPassword(e.target.value)}
            />
        </div>
        <div id ='RL_buttons'>
            <div style={{fontSize:'20px'}}>{message}</div>
            <button onClick={login}>Login</button>
            <button  onClick={() => navigate('/register')}>Go to Sign Up page</button>
        </div>
        </div>
    )
}

export default Login