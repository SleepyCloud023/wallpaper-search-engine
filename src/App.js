import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import getData from './api/getData';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const defaulCondition = {
    q: '',
};

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState(defaulCondition);

    useEffect(() => {
        (async function () {
            const queriedData = await getData(query);

            if (queriedData) {
                setData(queriedData);
            }
        })();
    }, []);

    return (
        <>
            <Container>
                <Hero query={query} setQuery={setQuery} setData={setData} />
                <ResultContainer data={data} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
