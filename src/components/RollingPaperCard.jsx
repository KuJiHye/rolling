import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MessageCount from "./MessageCount";
import EmojiBadgeList from "./EmojiBadgeList";
import { useEmojiReaction } from "../hooks/useEmojiReaction";

function RollingPaperCard({ card }) {
  const navigate = useNavigate();

  const { emojis } = useEmojiReaction(card.id);
  const sortedEmojis = [...emojis].sort((a, b) => b.count - a.count);

  const topThree = sortedEmojis.slice(0, 3);

  const handleCardClick = () => {
    navigate(`/post/${card.id}`);
  };

  return (
    <StyledCardWrapper
      onClick={handleCardClick}
      $colorName={card.backgroundColor}
    >
      <StyledCardContent>
        <StyledCardText>
          <StyledNameTitle>{card.name}</StyledNameTitle>
          <MessageCount card={card} />
        </StyledCardText>
        <StyledEmojiContent>
          <EmojiBadgeList emojiData={topThree} />
        </StyledEmojiContent>
      </StyledCardContent>
    </StyledCardWrapper>
  );
}

const StyledCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px 24px 20px;
  cursor: pointer;
  width: 275px;
  height: 260px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);

  background-color: ${({ $colorName }) =>
    colorMatching[$colorName] || "#ee3131"};
`;

const StyledNameTitle = styled.h2`
  font: var(--font-24-bold);
`;

const StyledCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;
  width: 100%;
`;

const StyledEmojiContent = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  padding-top: 16px;
`;

const colorMatching = {
  beige: "#FFE2AD",
  purple: "#ECD9FF",
  blue: "#B1E4FF",
  green: "#D0F5C3",
};
export default RollingPaperCard;
