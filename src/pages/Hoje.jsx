import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Topo from "../components/Topo";
import Menu from "../components/Menu";
import checkbox from "../assets/checkbox.png"
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

export default function Hoje() {
    const [habitosHoje, setHabitosHoje] = useState([])
    const [habitosMarcados, setHabitosMarcados] = useState([])
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)

    const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const diaSemana = diasSemana[(dayjs().day())];
    const dataHoje = dayjs().format("DD/MM");


    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [token])

    useEffect(() => {carregarHabitosHoje()}, [token])
    
    function carregarHabitosHoje(){
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get(URL, config)
            .then(res => {
                console.log(res.data)
                setHabitosHoje(res.data)
                const marcados = res.data.filter(hab => hab.done).map(hab => hab.id);
                setHabitosMarcados(marcados);
            })
            .catch(err => alert(err.response.data.message))
    }
    

    function marcarHabito(hab) {
        const URLCheck = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${hab.id}/check`;
        const URLUncheck = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${hab.id}/uncheck`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const isMarcado = habitosMarcados.includes(hab.id)

        axios.post(isMarcado ? URLUncheck : URLCheck, {}, config)
            .then((res) => carregarHabitosHoje())
            .catch((err) => Alert(err.response.data.message));
    }



    return (
        <Container>
            <Topo />
            <Titulo>
                <h1>{diaSemana}, {dataHoje}</h1>
            </Titulo>
            {habitosHoje.map(hab => (
                <EstiloHabitosHoje key={hab.id}>
                    <InfoHabitos>
                        <h1>{hab.name}</h1>
                        <p>Sequencia atual:{hab.currentSequence}</p>
                        <p>Seu recorde:{hab.highestSequence}</p>
                    </InfoHabitos>
                    <CheckBox
                        onClick={() => marcarHabito(hab)}
                        style={{
                            backgroundColor: habitosMarcados.includes(hab.id) ? "#8FC549" : "#E7E7E7",
                        }}
                    >
                        <img src={checkbox} />
                    </CheckBox>
                </EstiloHabitosHoje>
            ))}
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
    overflow-y: auto;
    margin-bottom: 65px;
    
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
`
const EstiloHabitosHoje = styled.div`
    box-sizing: border-box;
    width: 90%;
    height: auto;
    min-height: 90px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 20px;
    overflow-y: auto;
    margin-bottom: 20px;
    h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 20px;
        color:#666666;
        display: flex;
        justify-content: flex-start;
    }
`

const InfoHabitos = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 20px;
        color:#666666;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
    }
    p {
        font-family: "Lexend Exa", sans-serif;
        font-size: 13px;
        color:#666666;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
    }
`
const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    background-color: #E7E7E7;
    border-radius: 5px;
    cursor: pointer;
    ion-icon {
        font-size: 40px;
        color: #FFFFFF;
        
    }

`
