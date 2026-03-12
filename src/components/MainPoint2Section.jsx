import styled from 'styled-components';
import POINT2_CARDS_IMAGE from '../assets/ExampleCard2.svg';
import CURSOR_ICON from '../assets/CursorIcon.svg';

const MainPoint2Section = ({ isReverse = true }) => {
  return (
    <StyledSectionContainer $isReverse={isReverse}>
      <StyledContentWrapper>
        <StyledBadge>Point. 02</StyledBadge>
        <StyledTextContainer> 
          <StyledTitle>서로에게 이모지로 감정을 표현해보세요</StyledTitle>
          <StyledDescription>롤링 페이퍼에 이모지를 추가할 수 있어요.</StyledDescription>
        </StyledTextContainer>
      </StyledContentWrapper>

      <StyledImageArea>
        <StyledMainCardsImage src={POINT2_CARDS_IMAGE} alt="이모지 기능 안내" />
        <StyledCursorSecond src={CURSOR_ICON} alt="마우스 커서 2" />
      </StyledImageArea>
    </StyledSectionContainer>
  );
};

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: ${({ $isReverse }) => ($isReverse ? 'row-reverse' : 'row')};
  align-items: center; 
  justify-content: ${({ $isReverse }) => ($isReverse ? 'flex-end' : 'flex-start')}; 
  width: 1200px;
  height: 324px;
  border-radius: 16px;
  background-color: var(--surface);
  overflow: hidden; 
`;

const StyledImageArea = styled.div`
  position: relative; 
  width: 720px;
  height: 204px;
  aspect-ratio: 720 / 204;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0; 
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 295px; 
  height: 156px;
  gap: 16px;
`;

const StyledCursorSecond = styled.img`
  position: absolute;
  top: 8%;   
  right: 27%;
  width: 32px; 
  height: 32px;
  z-index: 10;
  pointer-events: none;
`;

const StyledMainCardsImage = styled.img`
  width: 100%; 
  max-width: 720px;
  height: auto;
  object-fit: contain;
`;

/* --- 텍스트 요소 --- */
const StyledBadge = styled.span`
  width: 80px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 50px;
  background-color: var(--purple-600);
  color: var(--white);
  font: var(--font-14-bold); 
  line-height: 20px;
  letter-spacing: -0.05em;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.h2`
  width: 100%;
  height: 72px;
  font: var(--font-24-bold);
  color: var(--gray-900);
  line-height: 36px;
  margin: 0;
`;

const StyledDescription = styled.p`
  width: 100%;
  height: 28px;
  font: var(--font-18-regular);
  color: var(--gray-500);
  line-height: 28px;
  margin: 0;
`;

export default MainPoint2Section;