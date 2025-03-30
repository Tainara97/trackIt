import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";

export default function Topo() {
    const [user] = useContext(UserContext);

    return (
        <EstiloTopo>
            <h1>TrackIt</h1>
            <img src={user.image} alt="User" />
        </EstiloTopo>
    );
}

const EstiloTopo = styled.div`
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    h1 {
        font-family: "Playball", cursive;
        color: #ffffff;
        font-size: 40px;
        padding: 20px;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 98px;
        padding: 20px;
    }
`