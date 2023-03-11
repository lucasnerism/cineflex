import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SuccessPage(props) {
    const { movie, dateTime, assentos, name, cpf } = props;
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{movie}</p>
                <p>{dateTime}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {assentos.map(el => <p key={el.seatname}>Assento {el.seatname}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>{assentos.length > 1 ? "Compradores" : "Comprador"}</p></strong>
                {assentos.map(el => (
                    <>
                        <p key={el.seatname} >Nome: {el.name}</p>
                        <p>CPF: {el.cpf}</p>
                    </>
                ))}

            </TextContainer>

            <Link to="/" ><button data-test="go-home-btn">Voltar para Home</button></Link>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`;