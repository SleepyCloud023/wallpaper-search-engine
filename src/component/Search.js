import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';
import getData from '../api/getData';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const defaulCondition = {
    q: '',
    order: 'popular',
    orientation: 'all',
    per_page: 20,
};

const Search = ({ setData }) => {
    const [query, setQuery] = useState(defaulCondition);

    const [searchOption, setSearchOption] = useState(false);
    const [recentWordList, setRecentWordList] = useState([]);

    const fetchQueryData = async (condition = query) => {
        const result = await getData(condition);
        if (result) {
            setData(result);
        }
    };

    const setWordList = (state) => {
        setRecentWordList(state);
        localStorage.setItem('recentWordList', JSON.stringify(state));
    };

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const onChange = (e) => {
        setQuery((prev) => ({ ...prev, q: e.target.value }));
    };

    const handleEnter = ({ key }) => {
        if (key === 'Enter') {
            fetchQueryData();

            const nextWordList = [
                ...recentWordList.filter((word) => word !== query.q),
                query.q,
            ];
            setWordList(nextWordList);
            setQuery((prev) => ({ ...prev, q: '' }));
        }
    };

    const onSelectIcon = (word) => (event) => {
        setQuery((prev) => ({ ...prev, q: word }));
        fetchQueryData({ ...query, q: word });
    };

    const onDeleteIcon = (targetIndex) => (event) => {
        event.stopPropagation();

        const nextWordList = recentWordList.filter(
            (_word, index) => index !== targetIndex
        );
        setWordList(nextWordList);
    };

    const onRadioSelect = (event) => {
        const { name, value } = event.target;
        setQuery((prev) => ({ ...prev, [name]: value }));
        fetchQueryData({ ...query, [name]: value });
    };

    const getStoredWordList = () => {
        const storedList = JSON.parse(localStorage.getItem('recentWordList'));
        if (storedList) {
            setRecentWordList(storedList);
        }
    };

    useEffect(() => {
        getStoredWordList();
        fetchQueryData();

        window.addEventListener('storage', getStoredWordList);
        return () => {
            window.removeEventListener('storage', getStoredWordList);
        };
    }, []);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        value={query.q}
                        onChange={onChange}
                        onKeyDown={handleEnter}
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && <SearchOption onRadioSelect={onRadioSelect} />}
            </SearchBoxContainer>
            <SearchTagContainer>
                {recentWordList.map((recentWord, index) => (
                    <SearchTag
                        key={recentWord}
                        recentWord={recentWord}
                        onDelete={onDeleteIcon(index)}
                        onSelect={onSelectIcon(recentWord)}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
