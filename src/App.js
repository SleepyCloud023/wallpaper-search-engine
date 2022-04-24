import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useState } from 'react';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState({});

    return (
        <>
            <Container>
                <Hero setData={setData} />
                <ResultContainer data={data} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
