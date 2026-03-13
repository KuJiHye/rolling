import styled from "styled-components";

function CreateMessageButton({ className, onClick, disabled }) {
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      생성하기
    </button>
  );
}

const Button = styled(CreateMessageButton)`
  width: 720px;
  height: 56px;
  color: var(--white);
  background-color: ${({ disabled }) =>
    disabled ? "var(--gray-300)" : "var(--purple-600)"};
  border-radius: 12px;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background-color: #7615d6;
  }

  &:disabled {
    background-color: #cccccc;
    color: #999999;
    cursor: not-allowed;
  }
  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

export default Button;
