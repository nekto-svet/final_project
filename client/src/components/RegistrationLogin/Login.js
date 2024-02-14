import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';

//
const Login = ({action}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');

    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async() => {
        try{
            const response = await axios.post('/login' || 'http://localhost:3001/login', {
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
        <>
         <h1>{action}</h1>
        <div>
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
        <button onClick={login}>Login</button>
        <div>{message}</div>
        </>
    )
}

export default Login