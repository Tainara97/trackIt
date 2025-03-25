import Topo from "../components/Topo";
import Menu from "../components/Menu";
import AdicionarHabitos from "./AdicionarHabito";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Habitos({ token }) {
    const [habits, setHabits] = useState(null)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get(URL, config)
            .then(res => setHabits(res.data))
            .catch(err => console.log(err.response.data))
    }, [token])

    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario)
    }

    if (habits === null) {
        return (
            <Container>
                <Carregando>
                    <img src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif" />
                </Carregando>
            </Container>
        )

    }

    return (
        <Container>
            <Topo />
            <Titulo>
                <h1>Meus habitos</h1>
                <button onClick={toggleFormulario}>+</button>
            </Titulo>
            {mostrarFormulario && <AdicionarHabitos token={token} />}
            {habits.length === 0 ? (
                <Texto>
                    <h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
                </Texto>
            ) : (
                habits.map(hab => (
                    <EstiloHabitos key={hab.id}>
                        <h1>{hab.name}</h1>
                        <Dias>
                            <p>D</p>
                            <p>S</p>
                            <p>T</p>
                            <p>Q</p>
                            <p>Q</p>
                            <p>S</p>
                            <p>S</p>
                        </Dias>
                    </EstiloHabitos>
                ))
            )}
            <Menu />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
`
const Titulo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 70px;
    h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 23px;
        color: #126BA5;
        margin-left: 15px;
        margin-top: 30px;
    }
    button {
        background-color: #52B6FF;
        border: none;
        width: 40px;
        height: 34px;
        margin-right: 15px;
        border-radius: 5px;
        font-size: 27px;
        color: #ffffff;
        margin-top: 30px;
    }
    
`
const Texto = styled.div`
    width: 90%;
    height: 100%;
    margin-left: 15px;
    margin-top: 20px;
    font-family: "Lexend Exa", sans-serif;
    font-size: 18px;
    color:#666666;
`

const EstiloHabitos = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

const Dias = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

const Carregando = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20%;
    }
   
`