import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../style/Loading";


export default function HomePage() {
    const [movies, setMovies] = React.useState(undefined);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
        promise.then(resp => {
            setMovies(resp.data);
            console.log(resp.data);
        });
        promise.catch(err => console.log(err.response.data));
    }, []);

    if (movies === undefined) {
        return (
            <Loading>
                Aguarde um instante!

                <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="carregando" />
            </Loading >
        );
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map(movie => (
                    <MovieContainer data-test="movie" >
                        <Link to={`/sessoes/${movie.id}`} ><img src={movie.posterURL} alt={movie.title} /> </Link>
                    </MovieContainer>
                ))}
            </ListContainer>

        </PageContainer>
    );
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
    padding-top: 70px;
`;
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`;
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`;