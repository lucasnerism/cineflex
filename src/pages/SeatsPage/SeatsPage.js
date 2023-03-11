import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../style/Loading";

export default function SeatsPage(props) {
    const { assentos, setAssentos, setMovie, setDateTime } = props;
    const { idSessao } = useParams();
    const [sessao, setSessao] = useState(undefined);
    const [form, setForm] = useState([{}]);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

        const promise = axios.get(url);
        promise.then(resp => setSessao(resp.data));
        promise.catch(err => console.log(err.response.data));
        setAssentos([]);
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
                        selecionado={assentos.some(el => el.seatid === seat.id)}
                        onClick={() => seat.isAvailable ? selecionar(seat.id, seat.name) : alert("Esse assento não está disponível")}
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
                {assentos.map((obj, index) => (
                    <div key={index}>
                        <label htmlFor="name">{`Nome do Comprador:${obj.seatname}`}</label>
                        <input
                            id={obj.seatname}
                            name="name"
                            data-test="client-name"
                            placeholder="Digite seu nome..."
                            required
                            index={index}
                            onChange={e => handleChange(e, index)}
                            value={obj.name}
                        />
                        <label htmlFor="cpf">{`CPF do Comprador:${obj.seatname}`}</label>
                        <input
                            id={obj.seatname}
                            name="cpf"
                            data-test="client-cpf"
                            placeholder="Digite seu CPF..."
                            required
                            onChange={e => handleChange(e, index)}
                            index={index}
                            value={obj.cpf}
                        />
                    </div>
                ))}


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

    function selecionar(seatid, seatname) {
        const obj = { seatid, seatname, name: "", cpf: "" };
        const arr = [...assentos];
        if (arr.some(el => el.seatid === seatid)) {
            if (arr.some(el => el.name !== "" || el.cpf !== "")) {
                if (window.confirm("Gostaria realmente de remover o assento e apagar os dados?") === true) {
                    const newarr = arr.filter(el => el.seatid !== seatid);
                    setAssentos(newarr);
                }
            } else {
                const newarr = arr.filter(el => el.seatid !== seatid);
                setAssentos(newarr);
            }
        } else {
            arr.push(obj);
            setAssentos(arr);
        }
    }

    function handleChange(event, index) {
        const data = [...assentos];
        data[index][event.target.name] = event.target.value;
        setAssentos(data);
    }

    function finalizar(e) {
        e.preventDefault();
        const ids = [];
        const compradores = [];
        assentos.forEach(el => {
            ids.push(el.seatid);
            compradores.push({ idAssento: el.seatid, name: el.name, cpf: el.cpf });
        });
        const obj = { ids, compradores };
        console.log(obj);
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promise = axios.post(url, obj);
        setMovie(sessao.movie.title);
        setDateTime(`${sessao.day.date} - ${sessao.name}`);
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
    ${props => (props.selecionado ? "border: 1px solid #0E7D71; background-color: #1AAE9E;"
        : props.isAvailable ? "border: 1px solid #7B8B99; background-color: #C3CFD9;"
            : "border: 1px solid #F7C52B; background-color: #FBE192;")}
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
    ${props => (props.selecionado ? "border: 1px solid #0E7D71; background-color: #1AAE9E;"
        : props.isAvailable ? "border: 1px solid #7B8B99; background-color: #C3CFD9; "
            : "border: 1px solid #F7C52B; background-color: #FBE192;")}
    cursor:pointer;
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