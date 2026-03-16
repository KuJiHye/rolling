import styled from "styled-components";
import MessageCount from "../../components/MessageCount";
import EmojiReaction from "../../components/EmojiReaction";
import ShareDropdown from "../../components/ShareDropdown";

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

        <ShareDropdown />
      </StyledActions>
    </StyledContainer>
  );
}

export default DetailHeader;

/* ==================== styled ==================== */

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1248px;
  margin: 0 auto;
  padding: 13px 24px;

  @media ${({ theme }) => theme.mobile} {
    align-items: start;
    flex-direction: column;
    padding: 0;
  }
`;

const StyledNameText = styled.h1`
  margin-right: auto;
  font: var(--font-28-bold);
  color: var(--gray-800);

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
    height: 52px;
    padding: 0 20px;
    border-bottom: 1px solid var(--gray-200);
    font: var(--font-18-bold);
    line-height: 52px;
  }
`;

const StyledActions = styled.div`
  display: flex;

  & > div {
    position: relative;
  }

  & > div::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 28px;
    background: var(--gray-200);
  }

  & > div:nth-child(1) {
    padding: 0 28px 0 0;
  }

  & > div:nth-child(2) {
    padding: 0 13px 0 28px;
  }

  & > div:nth-child(3) {
    padding: 0 0 0 13px;
  }
  & > div:nth-child(3)::after {
    display: none;
  }

  @media ${({ theme }) => theme.mobile} {
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    padding: 0 20px;

    & > div:nth-child(2) {
      padding: 0 13px 0 0;
    }
  }
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

  @media ${({ theme }) => theme.tablet} {
    display: none;
  }
`;
