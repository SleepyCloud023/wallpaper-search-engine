import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({ data }) => {
    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {/* <ImageModal open={true} hitsElement={data.hits[0]} /> */}
            <Pagination />
            <ResultsWrapper>
                <Result hits={data.hits} />
            </ResultsWrapper>
        </Container>
    );
};

const Result = ({ hits }) => {
    return hits ? (
        hits.map((imgData) => <ImageCard key={imgData.id} imgData={imgData} />)
    ) : (
        <EmptyResult />
    );
};

export default ResultContainer;
