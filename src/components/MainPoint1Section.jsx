import styled from 'styled-components';
import exampleCard from '../assets/ExampleCard.svg';
import CURSOR_ICON from '../assets/CursorIcon.svg';

const MainPoint1Section = ({ isReverse = false }) => {
  return (
    <StyledSectionContainer $isReverse={isReverse}>
      <StyledContentWrapper>
        <StyledBadge>Point. 01</StyledBadge>
        <StyledTextContainer> 
          <StyledTitle>누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요</StyledTitle>
          <StyledDescription>로그인 없이 자유롭게 만들어요.</StyledDescription>
        </StyledTextContainer>
      </StyledContentWrapper>

      <StyledImageArea>
        <StyledMainCardsImage src={exampleCard} alt="롤링페이퍼 예시 카드들" />
        <StyledCursorFirst src={CURSOR_ICON} alt="마우스 커서 1" />
      </StyledImageArea>
    </StyledSectionContainer>
  );
};

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: ${({ $isReverse }) => ($isReverse ? 'row-reverse' : 'row')};
  align-items: flex-start; 
  justify-content: flex-start; 
  width: 1200px;
  height: 324px;
  border-radius: 16px;
  background-color: var(--surface);
  gap: 152px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 268px;
  height: 156px;
  gap: 16px;
  margin-left: 60px;
  margin-top: 60px;
`;

/* --- 텍스트 영역 --- */
const StyledBadge = styled.span`
  width: 80px;
  height: 32px;
  padding: 6px 12px;
  gap: 10px;
  border-radius: 50px;
  background-color: var(--purple-600);
  color: var(--white);
  font: var(--font-14-bold); 
  line-height: 20px;
  letter-spacing: -0.05em;
`;

const StyledTitle = styled.h2`
  width: 268px;
  height: 72px;
  font: var(--font-24-bold);
  color: var(--gray-900);
  line-height: 36px;
  letter-spacing: -0.01em;
  margin: 0
`;

const StyledDescription = styled.p`
  width: 218px;
  height: 28px;
  font: var(--font-18-regular);
  color: var(--gray-500);
  line-height: 28px;
  letter-spacing: -0.01em;
  margin: 0px;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 268px;
  height: 108px;
  gap: 8px;
`;

/* --- 이미지 영역 --- */
const StyledImageArea = styled.div`
  position: relative; 
  width: 720px;
  height: 204px;
  aspect-ratio: 720 / 204; 
  margin-top: 60px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCursorFirst = styled.img`
  position: absolute;
  top: 42%;
  right: 15%;
  width: 32px; 
  height: 32px;
  z-index: 10;
  pointer-events: none;
`;

const StyledMainCardsImage = styled.img`
  width: 100%; 
  max-width: 650px;
  height: auto;
  object-fit: contain;
`;

export default MainPoint1Section;
