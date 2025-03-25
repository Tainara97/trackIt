import styled from "styled-components";
import logo from "../assets/biglogo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate()

    function fazerLogin(e) {
        e.preventDefault()
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const body = {email, password}

        axios.post(URL, body)
        .then(res => {
            console.log(res.data)
            setToken(res.data.token)
            navigate("/habitos")

        })
        .catch(err => console.log(err.response.data))
    }

    return (
        <Container>
            <Logo src={logo}/>
            <form onSubmit={fazerLogin}>
                <Input
                    type="text"
                    placeholder="email"
                    required
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                >
                </Input>
                <Input
                    type="password"
                    placeholder="senha"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                >
                </Input>
                <Button type="submit">Entrar</Button>
            </form>
            <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
        </Container>
    )
}

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70%;
        height: 100%;
        gap: 10px;
    }
    input::placeholder {
        font-family: "Lexend Exa", sans-serif;
        font-size: 20px;
        color:#DBDBDB;
    }

`

const Logo = styled.img`
    width: 180px;
    height: 180px;
    
`

const Input = styled.input`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid #D4D4D4;
    width: 100%;
    height: 45px;
    border-radius: 5px;
    padding: 5px;
`

const Button = styled.button`
    width: 100%;
    height: 45px;
    background-color: #52B6FF;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: "Lexend Exa", sans-serif;
    font-size: 20px;
    color: #FFFFFF;
    padding: 5px;

`
const StyledLink = styled(Link)`
    margin-top: 20px;
    font-family: "Lexend Exa", sans-serif;
    font-size: 14px;
    color: #52B6FF;
   
`
