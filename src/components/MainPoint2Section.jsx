import React from 'react';
import styled from 'styled-components';

const MainPoint2Section = ({ $isReverse = true }) => {
  const handleSectionClick = () => {
  };

  return (
    <StyledSectionContainer $isReverse={$isReverse} onClick={handleSectionClick}>
      <StyledContentWrapper>
        <StyledBadge>Point. 02</StyledBadge>
        <StyledTitle>
          서로에게 이모지로 감정을<br />
          표현해보세요
        </StyledTitle>
        <StyledDescription>롤링 페이퍼에 이모지를 추가할 수 있어요.</StyledDescription>
      </StyledContentWrapper>

      <StyledImageArea>
        <StyledEmojiPanel>
          <StyledEmojiRow>
            <StyledEmojiItem>👍 24</StyledEmojiItem>
            <StyledEmojiItem>😍 12</StyledEmojiItem>
            <StyledEmojiItem>🎉 24</StyledEmojiItem>
          </StyledEmojiRow>
          <StyledEmojiRow>
            <StyledEmojiItem>😢 10</StyledEmojiItem>
            <StyledEmojiItem>🥳 8</StyledEmojiItem>
            <StyledEmojiItem>👏 10</StyledEmojiItem>
          </StyledEmojiRow>
        </StyledEmojiPanel>
      </StyledImageArea>
    </StyledSectionContainer>
  );
};

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: ${({ $isReverse }) => ($isReverse ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center; 
  
  max-width: 1200px; 
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px; 
  background-color: var(--surface);
  border-radius: 16px;
  gap: 100px; 

  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 40px 24px;
    gap: 40px;
    text-align: center;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1200px) {
    align-items: center;
  }
`;

const StyledImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEmojiPanel = styled.div`
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const StyledEmojiRow = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledEmojiItem = styled.div`
  background-color: var(--gray-600);
  color: var(--white);
  padding: 8px 16px;
  border-radius: 50px;
  font: var(--font-16-regular);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledBadge = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 50px;
  background-color: var(--purple-600);
  color: var(--white);
  font: var(--font-14-bold); 
`;

const StyledTitle = styled.h2`
  font: var(--font-24-bold);
  color: var(--black);
  line-height: 1.5;
  margin-top: 16px;
  text-align: left;

  @media (max-width: 1200px) {
    text-align: center;
  }
`;

const StyledDescription = styled.p`
  font: var(--font-18-regular);
  color: var(--gray-500);
  margin-top: 8px;
`;

export default MainPoint2Section;
