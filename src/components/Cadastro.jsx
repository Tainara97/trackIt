import styled from "styled-components";
import logo from "../assets/biglogo.png";
import { Link, useNavigate }  from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Cadastro() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    function fazerCadastro(e) {
        e.preventDefault()
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const body = { email, password, name, image }

        axios.post(URL, body)
        .then(res => {
            navigate("/")
        })
        .catch(err => console.log(err.response))
    }

    return (
        <Container>
            <Logo src={logo}/>
            <form onSubmit={fazerCadastro}>
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
                <Input
                    type="text"
                    placeholder="nome"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                >
                </Input>
                <Input
                    type="text"
                    placeholder="foto"
                    required
                    value={image}
                    onChange={e => setImage(e.target.value)}
                >
                </Input>
                <Button type="submit">Cadastrar</Button>
            </form>
            <StyledLink to="/">Já possui uma conta? Faça login</StyledLink>
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
