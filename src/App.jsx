import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import Habitos from "./components/Habitos";
import Hoje from "./components/Hoje";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../src/contexts/UserContext"; 
import { useState } from "react";
import AdicionarHabitos from "./components/AdicionarHabito";

export default function App() {
  const [token, setToken] = useState(null)

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/habitos" element={<Habitos token={token}/>} />
          <Route path="/hoje" element={<Hoje />} />
        </Routes>
      </BrowserRouter>
  )
}

