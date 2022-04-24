import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text); ;
`;

const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
`;

const Pagination = ({ query, setQuery, fetchQueryData }) => {
    const maxPage = Math.floor(500 / query.per_page);
    const pageList = Array(maxPage)
        .fill(1)
        .map((x, index) => x + index);

    const onSelect = (event) => {
        const selectedNumber = parseInt(event.target.value);

        setQuery({ ...query, page: selectedNumber });
        fetchQueryData({ ...query, page: selectedNumber });
    };

    const onButton = (buttonType) => {
        let nextPage;
        switch (buttonType) {
            case 'prev':
                nextPage = query.page > 1 ? query.page - 1 : 1;
                break;
            case 'next':
                nextPage = query.page < maxPage ? query.page + 1 : maxPage;
                break;
            default:
                break;
        }
        setQuery({ ...query, page: nextPage });
        fetchQueryData({ ...query, page: nextPage });
    };

    return (
        <Nav>
            {query.page > 1 && (
                <PrevIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={() => onButton('prev')}
                />
            )}
            {`총 ${maxPage} 중 `}
            <PageSelect name="page" value={query.page} onChange={onSelect}>
                {pageList.map((pageNum) => (
                    <option value={pageNum} key={pageNum}>
                        {pageNum}
                    </option>
                ))}
            </PageSelect>
            페이지
            {query.page < maxPage && (
                <NextIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={() => onButton('next')}
                />
            )}
        </Nav>
    );
};

export default Pagination;
