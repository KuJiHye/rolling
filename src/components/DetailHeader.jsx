import styled from "styled-components";
import { device } from "../styles/media";
import MessageCount from "./MessageCount";
import EmojiReaction from "./EmojiReaction";
import ShareDropdown from "./ShareDropdown";

function DetailHeader({ card }) {
  if (!card) return null;

  return (
      <StyledContainer>
        <StyledNameText>To. {card.name}</StyledNameText>

        <StyledActions>
          <StyledMessageCountWrapper>
            <MessageCount card={card} />
          </StyledMessageCountWrapper>

          <StyledVerticalLine />
          <EmojiReaction recipientId={card.id} />
          <StyledVerticalLine $margin="14px"/>

          <ShareDropdown postData={card.recipientData} />
        </StyledActions>
      </StyledContainer>
    );
  };

export default DetailHeader;

/* ==================== styled ==================== */

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 13px 0;

  @media (max-width: 1248px) {
    max-width: none;
    width: calc(100% - 40px);
    padding: 13px 24px;
  }

  @media ${device.tablet} {
    /* 여기에 태블릿용 스타일 추가 가능 */
  }
`;

const StyledNameText = styled.h1`
  margin-right: auto;
  font: var(--font-28-bold);
  color: var(--gray-800);
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StyledVerticalLine = styled.div`
  width: 1px;
  height: 28px;
  background-color: var(--gray-200);
  margin: 0 ${(props) => props.$margin || "28px"};
`;

const StyledMessageCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  & > p {
    font: var(--font-18-regular);
    color: var(--gray-900);
  }

  & > span {
    font: var(--font-18-bold);
  }
`;