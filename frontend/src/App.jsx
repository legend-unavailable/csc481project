import { useEffect, useState } from "react";
import Login from "./pages/Login"
import Home from "./pages/Home";
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const[response, setResponse] = useState('');
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:3000/api');
    setResponse(response.data.str);
    console.log(response.data.str);
    
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login response={response}/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
