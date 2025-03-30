import Topo from "../components/Topo";
import Menu from "../components/Menu";
import AdicionarHabitos from "../components/AdicionarHabito";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";


export default function Habitos() {
    const [habits, setHabits] = useState([])
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"]
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)


    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])


    useEffect(() => {atualizarHabitos()}, [token])

    function atualizarHabitos() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get(URL, config)
            .then(res => setHabits(res.data))
            .catch(err => Alert(err.response.data.message))
    }


    const handleAdicionar = () => {
        setMostrarFormulario(true);
    };

    const handleCancelar = () => {
        setMostrarFormulario(false);
    };

    return (
        <Container>
            <Topo />
            <Titulo>
                <h1>Meus Hábitos</h1>
                <button onClick={handleAdicionar}>+</button>
            </Titulo>
            <AdicionarHabitosContainer isVisible={mostrarFormulario}>
                <AdicionarHabitos
                    token={token}
                    setMostrarFormulario={setMostrarFormulario}
                    handleCancelar={handleCancelar}
                    atualizarHabitos={atualizarHabitos}
                />
            </AdicionarHabitosContainer>
            {habits.length === 0 ? (
                <Texto>
                    <h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
                </Texto>
            ) : (
          
            habits.map((hab, index) => (
                    <EstiloHabitos key={hab.id}>
                        <h1>{hab.name}</h1>
                        <Dias>
                            {diasSemana.map((dia, index) =>
                                <Dia
                                    key={index}
                                    style={{
                                        backgroundColor: hab.days.includes(index) ? "#D4D4D4" : "#ffffff",
                                        color: hab.days.includes(index) ? "#fff" : "#DBDBDB",
                                        border: "1px solid #D4D4D4"
                                    }}
                                >
                                    {dia}
                                </Dia>
                            )}
                        </Dias>
                    </EstiloHabitos>
                ))
       
            )}
            <Menu />
        </Container >
    )
}

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow-y: auto;
    margin-bottom: 65px;
    padding: 15px;
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
    button{
        background-color: #52B6FF;
        border: none;
        width: 40px;
        height: 34px;
        margin-right: 15px;
        border-radius: 5px;
        font-size: 27px;
        color: #ffffff;
        margin-top: 30px;
        cursor: pointer;
    }
`

const AdicionarHabitosContainer = styled.div`
    box-sizing:border-box;
    display: ${(props) => (props.isVisible ? "block" : "none")};
    width: 90%;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px;
`;

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
    box-sizing: border-box;
    width: 90%;
    height: auto;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px;
    overflow: auto;
    h1 {
        font-family: "Lexend Exa", sans-serif;
        font-size: 20px;
        color:#666666;
        display: flex;
        justify-content: flex-start;
    }
    
`

const Dias = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    gap: 10px;
    margin-top: 20px;
`

const Dia = styled.div`
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        font-family: "Lexend Exa", sans-serif;
        font-size: 18px;
        text-align: center;
        color: #DBDBDB;
        cursor: pointer;
`