import { useState } from 'react';
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

const Search = ({ query, setQuery, setData }) => {
    const [searchOption, setSearchOption] = useState(false);

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const onChange = (e) => {
        setQuery((prev) => ({ ...prev, q: e.target.value }));
    };

    const handleEnter = ({ key }) => {
        if (key === 'Enter') {
            const queriedData = getData(query);

            queriedData.then((data) => {
                if (data) {
                    setData(data);
                }
            });

            setQuery((prev) => ({ ...prev, q: '' }));
        }
    };

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
                {searchOption && <SearchOption />}
            </SearchBoxContainer>
            <SearchTagContainer>
                <SearchTag />
            </SearchTagContainer>
        </>
    );
};

export default Search;
