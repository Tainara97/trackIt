import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function AdicionarHabitos({ token }) {
    const [name, setName] = useState("");
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

    const diaHabito = (index) => {
        if (days.includes(index)) {
            setDays(days.filter(d => d !== index))
        } else {
            setDays([...days, index])
        }
    }

    function enviarFormulario(e) {
        e.preventDefault();
        setLoading(true);
        const novoHabito = {
            name: name,
            days: days
        };

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios.post(URL, novoHabito, config)
            .then(res => {
                setName("");
                setDays([]);
                setLoading(false);
            })
            .catch(res => {
                alert("Erro ao criar o hábito. Tente novamente.");
                setLoading(false);
            })
    }

    return (
        <Container>
            <Form onSubmit={enviarFormulario}>
                <input
                    type="text"
                    placeholder="nome do habito"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                />
                <Dias>
                    {dias.map((dia, index) => (
                        <p
                            key={index}
                            onClick={() => diaHabito(index)}
                            style={{
                                backgroundColor: days.includes(index) ? "#D4D4D4" : "#ffffff",
                                color: days.includes(index) ? "#fff" : "#DBDBDB",
                                cursor: "pointer",
                                border: "1px solid #D4D4D4"
                            }}
                            disabled={loading}
                        >
                            {dia}
                        </p>
                    ))}
                </Dias>
                <ButtonContainer>
                        <ButtonCancelar
                            type="text"
                            onClick={() => {
                                setName("")
                                setDays([])
                            }}
                            disabled={loading}
                        >
                            Cancelar
                        </ButtonCancelar>
                        <ButtonSalvar
                            type="submit"
                            disabled={loading || !name || days.length === 0} 
                        >
                            Salvar
                        </ButtonSalvar>
                </ButtonContainer>
            </Form>
        </Container>

    )
}

const Container = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 5px;
    
`;

const Form = styled.form`
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
        box-sizing: border-box;
        font-family: "Lexend Exa", sans-serif;
        font-size: 20px;
        color:#666666;
        border: 1px solid #D4D4D4;
        border-radius:5px;
        width: 90%;
        height: 45px;
        padding: 10px;
    }
    input::placeholder{
        box-sizing: border-box;
        font-family: "Lexend Exa", sans-serif;
        font-size: 20px;
        color:#DBDBDB;
        border-radius:5px;
        width: 90%;
        height: 45px;
        padding: 10px;
    }
`;

const Dias = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    

    p {
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
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;
`;

const ButtonSalvar = styled.button`
    width: 100px;
    height: 35px;
    border-radius: 5px;
    font-size: 16px;
    font-family: "Lexend Exa", sans-serif;
    border: none;
    color: #fff;
    background-color: #52B6FF;
    cursor: pointer;

    &:disabled {
        background-color: #A4D7FF;
        cursor: not-allowed;
    }
`;

const ButtonCancelar = styled.button`
    background-color: #ffffff;
    color: #52B6FF;
    border: 1px solid #52B6FF;
    font-family: "Lexend Exa", sans-serif;
    font-size: 16px;
    border: none;
`;
