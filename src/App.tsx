import styled from "styled-components";
import "./App.css";
import Helper from "./helper/Helper";
import Solver from "./solver/Solver";

const Main = styled.div`
    background-color: cornflowerblue;
    display: flex;
    flex-flow: column;
    height: 100vh;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: white;
`;

const Header = styled.header`
    box-sizing: border-box;
    background-color: white;
    padding: 20px;
    flex: 0 1 auto;
    color: cornflowerblue;
    width: 100vw;
`;

const HeaderSpan = styled.span`
    margin-left: 20px;
    border: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: max-content;
    font-size: calc(10px + 2vmin);
    padding-left: 10px;
    padding-right: 10px;
`;

const logo = require("./assets/sudoku-logo.png");

function App() {
    return (
        <Main>
            <Helper>
                <Header>
                    <HeaderSpan>
                        <img src={logo} alt="logo" height="150px" />
                        Poggers Sudoku Solver
                    </HeaderSpan>
                </Header>
                <Solver></Solver>
            </Helper>
        </Main>
    );
}

export default App;
