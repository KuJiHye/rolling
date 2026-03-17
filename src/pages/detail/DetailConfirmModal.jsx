import useNoScroll from "../../hooks/useNoScroll";
import styled from "styled-components";
import DetailButton from "./DetailButton";
import AlertIcon from "../../assets/alert-icon.svg";
import { StyledModalOverlay } from "./DetailCardModal";

function DetailConfirmModal({ message, onConfirm, onCancel }) {
  useNoScroll();

  return (
    <StyledModalOverlay onClick={onCancel}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledMessage>
          <div>
            <img src={AlertIcon} alt="경고 아이콘" />
          </div>
          {message}
          <p>삭제하면 복구가 불가능합니다.</p>
        </StyledMessage>

        <StyledButtonGroup>
          <DetailButton className="btn btn-gray" onClick={onCancel}>
            취소
          </DetailButton>

          <DetailButton className="btn btn-purple" onClick={onConfirm}>
            확인
          </DetailButton>
        </StyledButtonGroup>
      </StyledModal>
    </StyledModalOverlay>
  );
}

const StyledModal = styled.div`
  background-color: var(--white);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
`;

const StyledMessage = styled.div`
  padding: 0 0 20px;
  border-bottom: 1px solid var(--gray-200);
  font: var(--font-20-regular);
  font-weight: 500;
  text-align: center;

  & p {
    margin: 5px 0 0;
    font: var(--font-16-regular);
    color: var(--gray-400);
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0 0;
`;

export default DetailConfirmModal;
