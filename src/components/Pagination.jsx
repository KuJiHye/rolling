import styled from "styled-components";

const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 8px 12px;
  background: ${(props) => (props.$active ? "#007bff" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? "#0056b3" : "#f0f0f0")};
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
`;

function Pagination({ totalCount, limit, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalCount / limit);
  if (totalPages === 0) return null;

  const PAGE_GROUP_SIZE = 5;
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <PaginationNav>
      {currentGroup > 0 && (
        <PageButton onClick={() => onPageChange(startPage - 1)}>
          &lt;
        </PageButton>
      )}

      {pages.map((page) => (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      {endPage < totalPages && (
        <PageButton onClick={() => onPageChange(endPage + 1)}>
          &gt;
        </PageButton>
      )}
    </PaginationNav>
  );
}
export default Pagination;