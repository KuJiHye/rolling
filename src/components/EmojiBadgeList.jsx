import styled from 'styled-components';

const EmojiBadgeList = ({ emojiData }) => {
  const topEmojis = emojiData?.slice(0, 3) || []; 

  return (
    <StyledBadgeListContainer>
      {topEmojis.map((emoji) => (
        <StyledEmojiBadge key={emoji.id}>
          <span className="emoji-icon">{emoji.emoji}</span>
          <span className="emoji-count">{emoji.count}</span>
        </StyledEmojiBadge>
      ))}
    </StyledBadgeListContainer>
  );
};

/* ==================== styled ==================== */

const StyledBadgeListContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledEmojiBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  gap: 2px; 
  
  min-width: 66px;   
  height: 36px;     
  padding: 8px 12px; 
  
 
  background: rgba(0, 0, 0, 0.54); 
  border-radius: 32px; 
  
  color: var(--white);
  
  .emoji-icon {
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
  }

  .emoji-count {
    font: var(--font-16-regular);
    line-height: 20px;
    display: flex;
    align-items: center;
  }
`;

export default EmojiBadgeList;