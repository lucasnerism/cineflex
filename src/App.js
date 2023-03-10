import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";


export default function App() {
    const [movie, setMovie] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [assentos, setAssentos] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage
                    setMovie={setMovie}
                    setDateTime={setDateTime}
                    assentos={assentos}
                    setAssentos={setAssentos}
                    name={name}
                    setName={setName}
                    cpf={cpf}
                    setCpf={setCpf}
                />} />
                <Route path="/sucesso" element={<SuccessPage
                    movie={movie}
                    dateTime={dateTime}
                    assentos={assentos}
                    name={name}
                    cpf={cpf}
                />} />
            </Routes>
        </BrowserRouter>
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`;
