import axios from "../api/axios";
import PrivateContent from "./PrivateContent";
import './HomePage.css';


const HomePage = () => {

    const handleCheckInvoice = () => {
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            // 'Content-Type': 'application/json'
        }

        axios.get('/invoice/', {headers})
    }

    const handleCheckUser = () => {
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
        axios.post('/users/hello', {login: "login", password: "password"}, {headers})
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.replace("http://localhost:3000/login");
    }

    return (
        <>
            {sessionStorage.token ? (
                <div>
                    <h1 style={{margin: '20px'}}>Home Page</h1>
                    <button className="btn btn-primary" style={{
                        position: 'absolute',
                        right:'20px',
                        top: '20px'

                    }} onClick={handleLogout}>Logout
                    </button>
                    {/*<button className="btn btn-primary" onClick={handleCheckInvoice}>Check invoice</button>*/}
                    {/*<button className="btn btn-primary" onClick={handleCheckUser}>Check user</button>*/}
                    <PrivateContent/>
                </div>
            ) : (<div><h1>You need to login first</h1>
                <a href="http://localhost:3000/login">Sign In</a></div>)}
        </>
    )
}

export default HomePage;