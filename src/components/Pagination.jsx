import styled from "styled-components";

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

  const handlePageClick = (page) => {
    onPageChange(page);

    // 모바일 너비(보통 768px 미만)일 때만 스크롤 실행
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageButton>
      ))}
      {endPage < totalPages && (
        <PageButton onClick={() => onPageChange(endPage + 1)}>&gt;</PageButton>
      )}
    </PaginationNav>
  );
}

const PageButton = styled.button`
  border: 1px solid var(--gray-200);
  padding: 8px 12px;
  background: ${(props) =>
    props.$active ? "var(--purple-600)" : "var(--white)"};
  color: ${(props) => (props.$active ? "var(--white)" : "#333")};
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background: #f5f5f5;
    color: var(--gray-100);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$active ? "var(--purple-600)" : "var(--gray-100)"};
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
`;
export default Pagination;
