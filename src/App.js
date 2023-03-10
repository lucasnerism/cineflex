import { useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
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
            <Header />
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


