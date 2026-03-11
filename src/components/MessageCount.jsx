import styled from "styled-components";
import MessageCountText from "./MessageCountText";

function MessageCount({ card }) {
  const maxCount = 3;
  const visibleCount = card.recentMessages.slice(0, maxCount);
  const remainingCount = card.messageCount - maxCount;

  return (
    <>
      <StyledAvatarList>
        {visibleCount.map((card) => (
          <StyledAvatarListItem key={card.id}>
            <StyledAvatar src={card.profileImageURL} />
          </StyledAvatarListItem>
        ))}
        {remainingCount > 0 && <StyledAvatarListItem>+{remainingCount}</StyledAvatarListItem>}
      </StyledAvatarList>

      <MessageCountText card={card} />
    </>
  );
}

export default MessageCount;

/* ==================== styled ==================== */

const StyledAvatarList = styled.ul`
  display: flex;
`;

const StyledAvatarListItem = styled.li`
  width: 28px;
  height: 28px;
  border: 1.4px solid #E3E3E3;
  border-radius: 50%;
  background-color: var(--white);
  font: var(--font-12-regular);
  color: #484848;
  overflow: hidden;

  &:nth-child(2),
  &:nth-child(3) {
    margin-left: -13px;
  }

  &:nth-child(4) {
    margin-left: -13px;
    text-align: center;
    line-height: 26px;
  }
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
`;
