import styled from "styled-components";

function DetailButton({ children, className, onClick }) {
  return (
    <StyledButton className={className} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default DetailButton;

/* ==================== styled ==================== */

const StyledButton = styled.button`
  &.btn {
    padding: 7px 17px;
    border-radius: 6px;
    font: var(--font-16-regular);
    color: var(--white);

    @media ${({ theme }) => theme.tablet} {
      width: 100%;
      padding: 10px 0px;
      border-radius: 8px;
    }
  }

  &.btn-gray {
    background-color: var(--gray-500);
  }
  &.btn-gray:hover {
    background-color: var(--gray-600);
  }

  &.btn-purple {
    background-color: var(--purple-600);
  }
  &.btn-purple:hover {
    background-color: var(--purple-700);
  }
`;
