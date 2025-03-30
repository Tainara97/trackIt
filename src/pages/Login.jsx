import styled from "styled-components";
import logo from "../assets/biglogo.png";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AuthContext from "../contexts/AuthContext";
import { ThreeDots } from "react-loader-spinner";



export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const { setToken } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)


    function fazerLogin(e) {
        setLoading(true)
        e.preventDefault()
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const body = { email, password }

        axios.post(URL, body)
            .then(res => {
                setToken(res.data.token)
                localStorage.setItem("token", res.data.token)
                setUser(res.data)
                localStorage.setItem("user", res.data)
                navigate("/habitos")
                setLoading(false)

            })
            .catch(err => {
                alert(err.response.data.message)
                setLoading(false)
            })


    }

    return (
        <Container>
            <Logo src={logo} />
            <form onSubmit={fazerLogin}>
                <Input
                    type="text"
                    placeholder="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                >
                </Input>
                <Input
                    type="password"
                    placeholder="senha"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                >
                </Input>
                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <ThreeDots
                            height="24"
                            width="24"
                            color="#fff"
                            ariaLabel="loading"
                            wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" 
                            }}
                        />
                    ) : "Entrar"}</Button>
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
    &:disabled {
        background-color: #a6cff7;
        cursor: not-allowed;
    }

`
const StyledLink = styled(Link)`
    margin-top: 20px;
    font-family: "Lexend Exa", sans-serif;
    font-size: 14px;
    color: #52B6FF;
   
`
