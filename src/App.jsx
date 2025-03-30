import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Habitos from "./pages/Habitos";
import Hoje from "./pages/Hoje";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../src/contexts/UserContext"; 
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(localStorage.getItem("user"))

  
  return (
    <AuthContext.Provider value={{token, setToken}}>
      <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login />} />
          <Route path="/habitos" element={<Habitos />} />
          <Route path="/hoje" element={<Hoje /> } />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </AuthContext.Provider>
    
      
  )
}

