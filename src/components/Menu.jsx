import styled from "styled-components";
import check from "../assets/check.png";

export default function Menu() {
    return (
        <EstiloMenu>
            <div className="habitos">
                <ion-icon name="calendar-outline"></ion-icon>
                <h1>Hábitos</h1>
            </div>
            <div className="hoje">
                <img src={check} alt="check"/>
                <h1>Hoje</h1>
            </div>
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
    .habitos {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #52B6FF;
        width: 50%;
        gap: 10px;
    }
    .habitos h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 18px;
        color: #ffffff;
        margin-top: 5px;
    }
    .habitos ion-icon {
        color: #ffffff;
        font-size: 24px;
    }
    .hoje {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        width: 50%;
        gap: 10px;
    }
    .hoje h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 18px;
        color: #D4D4D4;
        margin-top: 5px;
    }
    .hoje ion-icon {
        color: #ffffff;
        font-size: 24px;
    }
`