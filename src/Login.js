import { useRef, useState, useEffect } from 'react';
import axios from './api/axios'
const LOGIN_URL = '/users/signIn'
const HELLO_URL = '/users/hello'

const Login = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ login:user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));   
            const acessToken = response?.data.token;
            const headers = response.headers;
            console.log(headers)
        }
        catch (err) {
            if(!err.response){
                setErrorMessage('No server response');
            }
            else if(err.response?.status===400){
                setErrorMessage('Missing username or password')
            }
            else if(err.response?.status===401){
                setErrorMessage('Unauthorized')
            }
            else {
                setErrorMessage('Login failed')
            }
            errorRef.current.focus();

        }
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }
    // const handleSubmit = async(e) =>{
    //     e.preventDefault();
    //     try{
    //         const response = await axios.post(HELLO_URL,
    //         JSON.stringify({ login:user, password: pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' }
    //             }
    //         );
    //         console.log(response?.data);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    return (
        <>
            {success ? (
                <section>
                    <h1>Successfully logged in!</h1>
                    <p>
                        <a href="#"> Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <h1>Invoice app</h1>
                    <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive" >{errorMessage}</p>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an account?<br />
                        <span>
                            <a href="http://localhost:3000/register">Sign up</a>
                        </span>
                    </p>
                </section>
            )}</>
    )
}

export default Login