import Register from './Register';
import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <main className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<HomePage />}/>
    
      </Routes>
    </main>
    </BrowserRouter>

  );
}

export default App;
