import React from 'react';
import styled from 'styled-components';

const RollingPaperCard = ({ from, tag, message, date, avatarSeed }) => {
  return (
    <StyledCard>
      <StyledProfileRow>
        <StyledAvatar src={`https://picsum.photos/seed/${avatarSeed}/40/40`} referrerPolicy="no-referrer" />
        <StyledProfileText>
          <StyledName>From. {from}</StyledName>
          <StyledTag>{tag}</StyledTag>
        </StyledProfileText>
      </StyledProfileRow>
      <StyledMessage>{message}</StyledMessage>
      <StyledDate>{date}</StyledDate>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 206px;
  height: 162px;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const StyledProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const StyledAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  font: var(--font-14-bold);
  color: var(--black);
`;

const StyledTag = styled.span`
  font: var(--font-12-regular);
  color: var(--purple-600);
  background-color: var(--purple-100);
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
`;

const StyledMessage = styled.p`
  font: var(--font-14-regular);
  color: var(--gray-500);
  line-height: 1.4;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledDate = styled.span`
  font: var(--font-12-regular);
  color: var(--gray-400);
  margin-top: 4px;
`;

const MainPoint1Section = ({ $isReverse = false }) => {
  const handleSectionClick = () => {
  };

  return (
    <StyledSectionContainer $isReverse={$isReverse} onClick={handleSectionClick}>
      <StyledContentWrapper>
        <StyledBadge>Point. 01</StyledBadge>
        <StyledTitle>
          누구나 손쉽게, 온라인<br />
          롤링 페이퍼를 만들 수 있어요
        </StyledTitle>
        <StyledDescription>로그인 없이 자유롭게 만들어요.</StyledDescription>
      </StyledContentWrapper>

      <StyledImageArea>
        <StyledCardWrapper>
          <RollingPaperCard 
            from="강미나" 
            tag="친구" 
            message="코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 하세요!" 
            date="2023.07.08" 
            avatarSeed="user1"
          /> 
          <RollingPaperCard 
            from="박대영" 
            tag="동료" 
            message="일교차가 큰 시기입니다. 새벽에는 겨울, 한낮에는 여름, 아침저녁으로는 가을을 느껴보는 것도 좋을 것 같아요." 
            date="2023.07.08" 
            avatarSeed="user2"
          />
          <StyledEmptyCard>
             <StyledPlusIcon>+</StyledPlusIcon>
          </StyledEmptyCard>
        </StyledCardWrapper>
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
  position: relative;
  width: auto;
  height: auto;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  gap: 20px; 
  overflow: hidden;
`;

const StyledEmptyCard = styled.div`
  width: 206px;
  height: 162px;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const StyledPlusIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: var(--gray-700);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
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

export default MainPoint1Section;
