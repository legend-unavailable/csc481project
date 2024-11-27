import { useEffect, useState } from "react";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Event_create from "./pages/Event_create";
import Event_stats from "./pages/Event_stats";
import SignUp from "./pages/SignUp";
import Invites from "./pages/Invites";
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
        <Route path="/" element={<Login response={response} />} />
        <Route path="signup" element={<SignUp/>}  />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/eventC" element={<Event_create />} />
        <Route path="/eventS" element={<Event_stats />} />
        <Route path="/invites" element={<Invites />} />
      </Routes>
    </Router>
  );
}

export default App
