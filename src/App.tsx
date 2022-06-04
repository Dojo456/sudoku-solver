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
    background-color: white;
    padding: 20px;
    flex: 0 1 auto;
    color: cornflowerblue;
    width: 100%;
`;

function App() {
    return (
        <Main>
            <Helper>
                <Header>Poggers Sudoku Solver</Header>
                <Solver></Solver>
            </Helper>
        </Main>
    );
}

export default App;
