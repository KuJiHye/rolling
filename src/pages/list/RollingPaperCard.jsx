import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import MessageCount from "../../components/MessageCount";
import EmojiBadgeList from "../../components/EmojiBadgeList";
import { useEmojiReaction } from "../../hooks/useEmojiReaction";
import { colorMatching } from "../../constants/colorMatching";
import RollingPaperCardSkeleton from "./RollingPaperCardSkeleton";

function RollingPaperCard({ card, $variant, isLoading }) {
  const navigate = useNavigate();
  const { emojis } = useEmojiReaction(card?.id);

  if (isLoading || !card) {
    return <RollingPaperCardSkeleton $variant={$variant} />;
  }

  const sortedEmojis = [...emojis].sort((a, b) => b.count - a.count);

  const topThree = sortedEmojis.slice(0, 3);

  const handleCardClick = () => {
    navigate(`/post/${card.id}`);
  };

  const background = card.backgroundImageURL
    ? {
        type: "image",
        value: card.backgroundImageURL,
      }
    : {
        type: "color",
        value: colorMatching[card.backgroundColor] || "#ee3131",
      };

  return (
    <StyledCardWrapper
      onClick={handleCardClick}
      $colorName={card.backgroundColor}
      $background={background}
      $variant={$variant}
    >
      <StyledCardContent $variant={$variant}>
        <StyledCardText>
          <StyledNameTitle $isImage={background.type === "image"}>
            {" "}
            To. {card.name}
          </StyledNameTitle>
          <MessageCount card={card} isImage={background.type === "image"} />
        </StyledCardText>
        <StyledEmojiContent $isImage={background.type === "image"}>
          <EmojiBadgeList emojiData={topThree} />
        </StyledEmojiContent>
      </StyledCardContent>
    </StyledCardWrapper>
  );
}

export const StyledCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px 24px 20px;
  cursor: pointer;
  width: 275px;
  height: 260px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background-clip: padding-box;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);

  background-color: ${({ $colorName }) =>
    colorMatching[$colorName] || "#ee3131"};

  ${({ $background }) =>
    $background.type === "color"
      ? css`
          background-color: ${$background.value};
        `
      : css`
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
            url(${$background.value});
          background-size: cover;
          background-position: center;
        `}

  &::before {
    ${({ $background, $colorName }) =>
      $background.type === "color"
        ? css`
            content: "";
            position: absolute;
            z-index: 0;
            ${shapeStyles[$colorName] || ""}
          `
        : css`
            display: none;
          `}
  }

  @media ${({ theme }) => theme.tablet} {
    ${({ $variant }) =>
      $variant === "main" &&
      css`
        width: 275px;
        height: 260px;
      `}
  }

  @media ${({ theme }) => theme.mobile} {
    ${({ $variant }) =>
      $variant === "main" &&
      css`
        height: 232px;
        width: 208px;
      `}
    ${({ $variant }) =>
      $variant === "search" &&
      css`
        width: 100%;
      `}
  }
`;

export const StyledNameTitle = styled.h2`
  font: var(--font-24-bold);
  color: ${({ $isImage }) => ($isImage ? "white" : "black")};

  @media ${({ theme }) => theme.mobile} {
    font: var(--font-18-bold);
  }
`;

export const StyledCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 112px;
`;

export const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;
  width: 100%;
  z-index: 1;

  @media ${({ theme }) => theme.mobile} {
    ${({ $variant }) =>
      $variant === "main" &&
      css`
        gap: 20px;
      `}
    ${({ $variant }) =>
      $variant === "search" &&
      css`
        gap: 33px;
      `}
  }
`;

export const StyledEmojiContent = styled.div`
  border-top: 1px solid
    ${({ $isImage }) =>
      $isImage ? "rgba(255,255,255,0.5)" : "rgba(0, 0, 0, 0.12)"};
  width: 100%;
  padding-top: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

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
