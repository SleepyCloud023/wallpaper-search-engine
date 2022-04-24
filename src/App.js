import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useState } from 'react';
import getData from './api/getData';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const defaulCondition = {
    q: '',
    orientation: 'all',
    order: 'popular',
    page: 1,
    per_page: 20,
};

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState(defaulCondition);
    const [theme, setTheme] = useState('light');

    const fetchQueryData = async (condition = query) => {
        const result = await getData(condition);
        if (result) {
            setData(result);
        }
    };

    return (
        <>
            <Container className={theme !== 'light' ? 'dark' : null}>
                <Hero
                    query={query}
                    setQuery={setQuery}
                    fetchQueryData={fetchQueryData}
                />
                <ResultContainer
                    data={data}
                    query={query}
                    setQuery={setQuery}
                    fetchQueryData={fetchQueryData}
                />
                <Footer />
                <ToggleThemeButton theme={theme} setTheme={setTheme} />
            </Container>
        </>
    );
}

export default App;
