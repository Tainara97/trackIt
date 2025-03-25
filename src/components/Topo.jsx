import logo from "../assets/logo.png";
import styled from "styled-components";

export default function Topo() {
    return (
        <EstiloTopo>
            <h1>TrackIt</h1>
            <img src={logo} alt="logo"/>
        </EstiloTopo>
    )
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