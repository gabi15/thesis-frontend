import {useRef, useState, useEffect} from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import './Login.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/users/register";

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();

    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);

    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd == matchPwd;
        setValidMatch(match);

    }, [pwd, matchPwd])

    useEffect(() => {
        setErrorMessage('');

    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({login: user, password: pwd}), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);

            if (response) {
                setSuccess(true);
            }

        } catch (err) {
            console.log("here!!!")
            console.log(err)
            if (!err.response) {
                setErrorMessage('No server response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Username already taken')
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login failed')
            }
            errorRef.current.focus();


        }

    }


    return (
        <>
            <div className={'Login'}>
                {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <a href="http://localhost:3000/login">Sign In</a>
                        </p>
                    </section>
                ) : (

                    <section>
                        <h1>Invoice app</h1>
                        <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}
                           aria-live="assertive">{errorMessage}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit} className={"loginRegisterForm"}>
                            <label htmlFor="username">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                4 to 24 characters.<br/>
                                Must begin with a letter.<br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 to 24 characters.<br/>
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                                aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                                aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validMatch || !matchPwd ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must match the first password input field.
                            </p>
                            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

                        </form>
                        <p>
                            Already registered?<br/>
                            <span className="line">
                            <a href="http://localhost:3000/login">Sign In</a>
                        </span>
                        </p>
                    </section>
                )}
            </div>
        </>
    )
}

export default Register

