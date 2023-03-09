import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../style/Loading";

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [sessao, setSessao] = React.useState(undefined);
    const [assentos, setAssentos] = React.useState([]);
    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

        const promise = axios.get(url);
        promise.then(resp => setSessao(resp.data));
        promise.catch(err => console.log(err.response.data));
    }, []);

    if (sessao === undefined) {
        return (
            <Loading>
                Aguarde um instante!

                <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="carregando" />
            </Loading >
        );
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessao.seats.map(seat => (
                    <SeatItem
                        data-test="seat"
                        key={seat.id}
                        isAvailable={seat.isAvailable}
                        selecionado={assentos.includes(seat.id)}
                        onClick={() => seat.isAvailable ? selecionar(seat.id) : null}
                    >{seat.name}</SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle selecionado />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={finalizar}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input
                    id="name"
                    data-test="client-name"
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input
                    id="cpf"
                    data-test="client-cpf"
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                />

                <button type="submit" data-test="book-seat-btn" >Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessao.movie.posterURL} alt={sessao.movie.title} />
                </div>
                <div>
                    <p>{sessao.movie.title}</p>
                    <p>{`${sessao.day.weekday} - ${sessao.name}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
    function selecionar(seat) {
        const arr = [...assentos];
        if (arr.includes(seat)) {
            const index = arr.indexOf(seat);
            arr.splice(index, 1);
            setAssentos(arr);
        } else {
            arr.push(seat);
            setAssentos(arr);
        }
    }
    function finalizar(e) {
        e.preventDefault();
        const ids = assentos;
        const obj = { name, cpf, ids };
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promise = axios.post(url, obj);
        promise.then(() => navigate("/sucesso"));
        promise.catch(err => console.log(err.response));
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;
const CaptionCircle = styled.div`
    ${props => (props.selecionado ? "border: 1px solid #0E7D71; background-color: #1AAE9E;" : props.isAvailable ? "border: 1px solid #7B8B99; background-color: #C3CFD9;" : "border: 1px solid #F7C52B; background-color: #FBE192;")}
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;
const SeatItem = styled.div`
    ${props => (props.selecionado ? "border: 1px solid #0E7D71; background-color: #1AAE9E;" : props.isAvailable ? "border: 1px solid #7B8B99; background-color: #C3CFD9;" : "border: 1px solid #F7C52B; background-color: #FBE192;")}
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;