import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/") {
    return (
      <NavContainer>
        <button onClick={() => navigate(-1)} data-test="go-home-header-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/109/109618.png" alt="voltar" />
        </button>
        <Link to="/" >CINEFLEX</Link>
      </NavContainer>
    );
  } else return (
    <NavContainer>
      <Link to="/" >CINEFLEX</Link>
    </NavContainer>
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
    img{
        width: 30px;
        position: fixed;
        left: 1.5%;
        top: 2.2%;
    }
`;