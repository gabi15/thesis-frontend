import {useRef, useState, useEffect} from 'react';
import axios from '../api/axios'
import HomePage from './HomePage';
import './Login.css';

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
                JSON.stringify({login: user, password: pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            const acessToken = response?.data.token;
            const headers = response.headers;
            sessionStorage.setItem('token', acessToken);
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err.response) {
                setErrorMessage('No server response');
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing username or password')
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized')
            } else if (err.response?.status === 500) {
                setErrorMessage('Server error')
            } else {
                setErrorMessage('Login failed')
            }
            errorRef.current.focus();
            sessionStorage.removeItem('token')

        }
    }

    return (
        <>
            <div className={"Login"}>
                {success ? (
                    <section>
                        <h1>Successfully logged in!</h1>
                        <p>
                            <a href="http://localhost:3000/home"> Home</a>
                        </p>
                    </section>
                ) : (
                    <section>
                        <h1>Invoice app</h1>
                        <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}
                           aria-live="assertive">{errorMessage}</p>
                        <h1>Sign in</h1>
                        <form onSubmit={handleSubmit} className="loginRegisterForm">
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
                            Need an account?<br/>
                            <span>
                            <a href="http://localhost:3000/register">Sign up</a>
                        </span>
                        </p>
                    </section>

                )}</div>
        </>
    )
}

export default Login