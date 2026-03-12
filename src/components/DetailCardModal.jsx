import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import DetailButton from "./DetailButton";
import ContentWrapper from "./ContentWrapper";
import { fontMap } from "../constants/fontMap";
import {
  StyledAvatar,
  StyledAvatarWrapper,
  StyledRelationship,
  StyledSenderName,
  StyledSenderText,
} from "./DetailCardListItem";

function DetailCardModal({ card, onClose }) {
  const formatted = card.createdAt.slice(0, 10).replace(/-/g, ".");

  // 모달 창이 띄워졌을 때 뒤에 화면 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <StyledModalOverlay onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledAvatarWrapper>
            <StyledAvatar src={card.profileImageURL} />
          </StyledAvatarWrapper>

          <div>
            <StyledSenderText>
              From. <StyledSenderName>{card.sender}</StyledSenderName>
            </StyledSenderText>
            <StyledRelationship type={card.relationship}>
              {card.relationship}
            </StyledRelationship>
          </div>

          <StyledCreatedAt>{formatted}</StyledCreatedAt>
        </StyledModalHeader>

        <StyledContent
          style={{ fontFamily: fontMap[card.font] }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.content) }}
        />

        <StyledButtonGroup>
          <StyledDetailButton className="btn btn-purple" onClick={onClose}>
            확인
          </StyledDetailButton>
        </StyledButtonGroup>
      </StyledModal>
    </StyledModalOverlay>,
    document.getElementById("modal-root"),
  );
}

export default DetailCardModal;

/* ==================== styled ==================== */

export const StyledModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const StyledModal = styled.div`
  width: 600px;
  height: 476px;
  background-color: var(--white);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
`;

const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 16px;
  padding: 0 0 19px;
  border-bottom: 1px solid var(--gray-200);
`;

const StyledCreatedAt = styled.p`
  margin-left: auto;
  font: var(--font-14-regular);
  color: var(--gray-400);
`;

const StyledContent = styled(ContentWrapper)`
  height: 240px;
  padding: 0 20px 0 0;
  font: var(--font-18-regular);
  color: #5a5a5a;
  word-break: break-word;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }
`;

const StyledButtonGroup = styled.div`
  margin: 24px 0 0;
  text-align: center;
`;

const StyledDetailButton = styled(DetailButton)`
  width: 120px;
`;
