

// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../App";

// const Authorization = (props) => {
//     const [redirect, setRedirect] = useState(false);
//     const {token, setToken} = useContext(AuthContext)

//     useEffect(() => {
//         verify();
//     }, [])

//     const verify = async () => {
//         try {
//             const res = await axios.get('http://localhost:3001/verify', {
//                 headers:{
//                     "x-access-token":token
//                 }
//             });
//             if(res.status === 200) setRedirect(true);
//         } catch (error) {
//             setRedirect(false);
//         }
//     }

//     return redirect? props.children : <>not authorized</>

// }

// export default Authorization;

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const Authorization = (props) => {
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
            const res = await axios.get('http://localhost:3001/verify', {
                headers: {
                    "x-access-token": tokenToVerify,
                    'Access-Control-Allow-Origin': '*', 
                },
                withCredentials:true,

            });
            if (res.status === 200) {
                setRedirect(true);
            } else {
                navigate('/login');
            }
        } catch (error) {
            navigate('/login');
        }
    }
    return redirect ? props.children : <>Not authorized</>;
}

export default Authorization;
