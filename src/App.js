import Register from './Register';
import './App.css';
import Login from './Login';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <main className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
    
      </Routes>
    </main>
    </BrowserRouter>

  );
}

export default App;
