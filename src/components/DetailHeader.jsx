import styled from "styled-components";
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

        <EmojiReaction recipientId={card.id} />

        <ShareDropdown postData={card.recipientData} />
      </StyledActions>
    </StyledContainer>
  );
}

export default DetailHeader;

/* ==================== styled ==================== */

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 13px 0;
`;

const StyledNameText = styled.h1`
  margin-right: auto;
  font: var(--font-28-bold);
  color: var(--gray-800);
`;

const StyledActions = styled.div`
  display: flex;
`;

const StyledMessageCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;
