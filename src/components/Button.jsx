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
  color: white;
  background-color: ${({ disabled }) => (disabled ? "grey" : "#9935ff")};
  border-radius: 12px;
  border: none;
  cursor: pointer;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background-color: #7615d6;
  }
`;

export default Button;
