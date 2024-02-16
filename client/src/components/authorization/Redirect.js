
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
const baseURL = process.env.REACT_APP_BASE_URL || '';
axios.defaults.withCredentials = true; 

const Redirect = (props) => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const { token, setToken } = useContext(AuthContext);

    //
    // useEffect(() => {
    //     const test = async() => {
    //         const storedToken = await getToken();
    //         console.log('storedToken', storedToken)
    //         if (storedToken) {
    //             setToken(storedToken);
    //             verify(storedToken); 
    //         } else {
    //             verify(token);
    //         }
    //     };
    //     test();
        
    // }, []);

    useEffect(()=> {
        const storedToken = localStorage.getItem('token');
        if (storedToken){
            verify(storedToken);
        } else verify(token)
    }, []);

    
    // const getToken = async (token) => {
    //     try {
    //         const res = await axios.get('http://localhost:3001/token', {
    //             withCredentials:true,

    //         });
    //         if (res.status === 200) {
    //             console.log ('from get token',res.data);
    //             // setRedirect(true);
    //             return res.data
    //         } else {
    //             // navigate('/login');
    //         }
    //     } catch (error) {
    //         console.log('error from get token',error)
    //         // navigate('/login');
    //     }
    // }

    
    const verify = async (tokenToVerify) => {
        
        try {
            const res = await axios.get(`${baseURL}/verify`, {
                headers: {
                    "x-access-token": tokenToVerify,
                    'Access-Control-Allow-Origin': '*', 
                },
                withCredentials:true,

            });
            if (res.status === 200) {
                console.log('approved')
                navigate('/select');
            } else {
                setRedirect(true);
                
            }
        } catch (error) {
            setRedirect(true);
        }
    }
    return redirect ? props.children : <>Authorized</>;
}

export default Redirect;

