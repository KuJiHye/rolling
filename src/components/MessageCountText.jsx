import styled from "styled-components";

function MessageCountText({ card }) {
  return (
    <StyledCountText>
      <StyledCount>{card.messageCount}</StyledCount>명이 작성했어요!
    </StyledCountText>
  );
}

export default MessageCountText;

/* ==================== styled ==================== */

const StyledCountText = styled.p`
  font: var(--font-18-regular);
  color: var(--gray-900);
`;

const StyledCount = styled.span`
  font: var(--font-18-bold);
`;
