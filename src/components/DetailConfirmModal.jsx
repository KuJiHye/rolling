import { useEffect } from "react";
import styled from "styled-components";
import DetailButton from "./DetailButton";
import AlertIcon from "../assets/alert-icon.svg";

const StyledModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000060;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background-color: var(--white);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px #00000014;
`;

const StyledMessage = styled.div`
  padding: 0 0 20px;
  border-bottom: 1px solid var(--gray-200);
  font: var(--font-20-regular);
  font-weight:500;
  text-align: center;

  & p {
    margin: 5px 0 0;
    font: var(--font-16-regular);
    color: var(--gray-400);
  }
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0 0;
`;

const StyledButton = styled(DetailButton)`
  padding: 7px 17px;
  border-radius: 6px;
  color: var(--white);
  line-height: 26px;

  &.cancel-btn {
    background-color: var(--gray-600);
  }
  &.cancel-btn:hover {
    background-color: var(--gray-700);
  }

  &.confirm-btn {
    background-color: var(--purple-600);
  }
  &.confirm-btn:hover {
    background-color: var(--purple-700);
  }
`;

function DetailConfirmModal({ message, onConfirm, onCancel }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <StyledModalBg onClick={onCancel}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledMessage>
          <div>
            <img src={AlertIcon} alt="경고 아이콘" />
          </div>
          {message}
          <p>삭제하면 복구가 불가능합니다.</p>
        </StyledMessage>
        <StyledButtonDiv>
          <StyledButton className="cancel-btn" onClick={onCancel}>
            취소
          </StyledButton>

          <StyledButton className="confirm-btn" onClick={onConfirm}>
            확인
          </StyledButton>
        </StyledButtonDiv>
      </StyledModal>
    </StyledModalBg>
  );
}

export default DetailConfirmModal;
