import styled from "styled-components";

const MessageCountDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;
const ProfileList = styled.ul`
  display: flex;
`;
const ProfileListLi = styled.li`
  width: 28px;
  height: 28px;
  border: 1.4px solid var(--white);
  border-radius: 50%;
  font-size: var(--font-12);
  font-weight: var(--medium);
  color: #484848;
  overflow: hidden;

  &:nth-child(2),
  &:nth-child(3) {
    margin-left: -14px;
  }

  &:last-child {
    margin-left: -14px;
    border: 1px solid #e3e3e3;
    background-color: var(--white);
    text-align: center;
    line-height: 28px;
  }
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;
const TotalCountP = styled.p`
  font-size: var(--font-18);
  color: var(--gray-900);
`;
const TotalCount = styled.span`
  font-weight: var(--bold);
`;

function MessageCount({ card }) {
  const maxCount = 3;
  const visibleCount = card.recentMessages.slice(0, maxCount);
  const remainingCount = card.messageCount - maxCount;

  return (
    <MessageCountDiv>
      <ProfileList>
        {visibleCount.map((card) => (
          <ProfileListLi key={card.id}>
            <ProfileImg src={card.profileImageURL} />
          </ProfileListLi>
        ))}
        {remainingCount > 0 && <ProfileListLi>+{remainingCount}</ProfileListLi>}
      </ProfileList>
      <TotalCountP>
        <TotalCount>{card.messageCount}</TotalCount>명이 작성했어요!
      </TotalCountP>
    </MessageCountDiv>
  );
}

export default MessageCount;
