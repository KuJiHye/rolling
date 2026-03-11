import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
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
  position: relative; /* 가상 요소의 기준점 */
  overflow: hidden; /* 도형이 카드 밖으로 나가지 않게 함 */
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

  &::before {
    content: "";
    position: absolute;
    bottom: -20px; /* 우측 하단에 걸치도록 배치 */
    right: -20px;

    /* 전달된 색상 이름에 따라 도형 스타일 적용 */
    ${({ $colorName }) => shapeStyles[$colorName] || ""}
  }
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
  z-index: 1;
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
const shapeStyles = {
  beige: css`
    width: 332px;
    height: 318px;
    top: 124px;
    left: 154px;
    angle: 0 deg;
    opacity: 1;
    border-radius: 51px;
    background-color: rgba(255, 211, 130, 0.7);
  `,
  purple: css`
    width: 336px;
    height: 169px;
    top: 124px;
    left: 133px;
    angle: 0 deg;
    opacity: 1;
    border-radius: 90.5px;
    background-color: rgba(220, 185, 255, 0.4);
  `,
  green: css`
    width: 336px;
    height: 169px;
    top: 124px;
    left: 133px;
    angle: 0 deg;
    opacity: 1;
    border-radius: 90.5px;
    background-color: rgba(155, 226, 130, 0.3);
  `,
  blue: css`
    width: 500px;
    height: 500px;
    top: 10px;
    left: -14px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cpath d='M115 385 L250 151 L385 385 Z' fill='%239dddff' stroke='%239dddff' stroke-width='70' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    transform: rotate(0deg);
    opacity: 1;
  `,
};
export default RollingPaperCard;
