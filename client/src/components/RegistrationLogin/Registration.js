import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../App';

const Registration = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [message, setMessage] = useState('');

    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const registration = async() => {
        
        try{
            const response = await axios.post( `/register`  ||  'http://localhost:3001/register', {
                username, email, first_name, last_name, password
            });
            if (response.status === 200) {
                setMessage('');
                navigate('/login');
            }
        }
        catch(err){
            console.log(err);
            setMessage(err.response.data.msg);
        }
    }

    return(
        <>
         <h1>Registration</h1>
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
             <input
            id='username'
            type='text'
            label='Choose your username'
            placeholder='Choose your username'
            onChange={(e)=> setUsername(e.target.value)}
            />
            <input
            id='first_name'
            type='text'
            label='Enter your first_name'
            placeholder='Enter your first_name'
            onChange={(e)=> setFirst_name(e.target.value)}
            />
             <input
            id='last_name'
            type='text'
            label='Enter your last_name'
            placeholder='Enter your last_name'
            onChange={(e)=> setLast_name(e.target.value)}
            />
        </div>
        {/* </Box> */}
        <button variant='contained' onClick={registration}>Register</button>
        <div>{message}</div>
        </>
    )
}

export default Registration