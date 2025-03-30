import styled from "styled-components";
import check from "../assets/check.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Menu() {
    const [botaoHabitos, setBotaoHabitos] = useState(true)
    const [botaoHoje, setBotaoHoje] = useState(false)
    const navigate = useNavigate()
    const location = useLocation(); 


    useEffect(() => {
        if (location.pathname === "/habitos") {
            setBotaoHabitos(true);
            setBotaoHoje(false);
        } else if (location.pathname === "/hoje") {
            setBotaoHoje(true);
            setBotaoHabitos(false);
        }
    }, [location.pathname]); 

    function MenuHabitos() {
        if (botaoHabitos) return;  
        setBotaoHabitos(true);  
        setBotaoHoje(false);    
        navigate("/habitos");  
    }

   
    function MenuHoje() {
        if (botaoHoje) return;  
        
        setBotaoHoje(true);     
        setBotaoHabitos(false); 
        navigate("/hoje");     
    }

    

    return (
        <EstiloMenu>
            <button
                className="habitos"
                onClick={MenuHabitos}
                style={{
                    backgroundColor: botaoHabitos ? "#52B6FF"  : "#ffffff",
                    color: botaoHabitos ? "#ffffff" : "#D4D4D4",
                }}
            >
                <ion-icon name="calendar-outline"></ion-icon>
                <h1>Hábitos</h1>
            </button>
            <button
                className="hoje"
                onClick={MenuHoje}
                style={{
                    backgroundColor: botaoHoje ? "#52B6FF"  : "#ffffff",
                    color: botaoHoje ? "#ffffff" : "#D4D4D4",
                }}
            >
                <img src={check} alt="check"/>
                <h1>Hoje</h1>
            </button>
        </EstiloMenu>
    )
  
}


const EstiloMenu = styled.div`
    width: 100%;
    height: 65px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    border: none;
    .habitos {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        gap: 10px;
        border: none;
        cursor: pointer;
    }
    .habitos h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 18px;
        margin-top: 5px;
    }
    .hoje {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        gap: 10px;
        border: none;
        cursor: pointer;
    }
    .hoje h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 18px;
        
        margin-top: 5px;
    }
    .hoje ion-icon {
        color: #ffffff;
        font-size: 24px;
    }

    .habitos ion-icon {
    color: #ffffff;
    font-size: 24px;
}
`