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

const ResultContainer = ({ data, query, setQuery, fetchQueryData }) => {
    const [modalInfo, setmodalInfo] = useState({ open: false, index: 0 });

    const onImageClick = (index) => {
        setmodalInfo({ open: true, index });
    };

    const onDeleteIcon = () => {
        setmodalInfo({ ...modalInfo, open: false });
    };

    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {data.hits && (
                <ImageModal
                    open={modalInfo.open}
                    hitsElement={data.hits[modalInfo.index]}
                    onDeleteIcon={onDeleteIcon}
                />
            )}
            <Pagination
                query={query}
                setQuery={setQuery}
                fetchQueryData={fetchQueryData}
            />
            <ResultsWrapper>
                <Result
                    hits={data.hits}
                    onImageClick={onImageClick}
                    setmodalInfo={setmodalInfo}
                />
            </ResultsWrapper>
        </Container>
    );
};

const Result = ({ hits, onImageClick }) => {
    return hits ? (
        hits.map((imgData, index) => (
            <ImageCard
                key={imgData.id}
                imgData={imgData}
                onClick={() => onImageClick(index)}
            />
        ))
    ) : (
        <EmptyResult />
    );
};

export default ResultContainer;
