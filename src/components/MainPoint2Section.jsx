import styled from 'styled-components';
import POINT2_CARDS_IMAGE from '../assets/ExampleCard2.svg';
import CURSOR_ICON from '../assets/CursorIcon.svg';

const MainPoint2Section = ({ isReverse = true }) => {
  return (
    <StyledSectionContainer $isReverse={isReverse}>
      <StyledContentWrapper $isReverse={isReverse}>
        <StyledBadge>Point. 02</StyledBadge>
        <StyledTextContainer> 
          <StyledTitle>서로에게 이모지로 감정을 표현해보세요</StyledTitle>
          <StyledDescription>롤링 페이퍼에 이모지를 추가할 수 있어요.</StyledDescription>
        </StyledTextContainer>
      </StyledContentWrapper>

      <StyledImageArea>
        <StyledImageWrapper>
          <StyledMainCardsImage src={POINT2_CARDS_IMAGE} alt="이모지 기능 안내" />
          <StyledCursorSecond src={CURSOR_ICON} alt="마우스 커서 2" />
        </StyledImageWrapper>
      </StyledImageArea>
    </StyledSectionContainer>
  );
};

/* --- 스타일 --- */
const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: column; 
  align-items: center;
  width: 100%;
  max-width: 1200px;
  background-color: var(--surface); 
  border-radius: 16px;
  margin: 0 auto;
  overflow: hidden;

  @media (min-width: 1248px) {
    flex-direction: ${({ $isReverse }) => ($isReverse ? 'row-reverse' : 'row')};
    height: 440px; 
    justify-content: space-between;
    padding: 60px;
    margin-bottom: 48px;
  }

  @media (max-width: 1247px) {
    width: calc(100% - 48px); 
    margin: 0 24px 24px 24px;
    padding: 40px;
    height: auto;
  }

  @media ${({ theme }) => theme.tablet} {
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 24px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 1248px) {
    width: 295px;
    padding: 0;
    flex-shrink: 0;
  }

  @media ${({ theme }) => theme.tablet} {
    padding: 0 10%;
    align-items: flex-start; 
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 0 24px;
    gap: 8px;
  }
`;

const StyledTitle = styled.h2`
  color: var(--gray-900);
  margin: 0;
  
  font: var(--font-24-bold);
  font-size: clamp(18px, 5vw, 28px);

  @media (min-width: 1248px) {
    font-size: 24px;
  }
`;

const StyledDescription = styled.p`
  color: var(--gray-500);
  margin: 0;
  
  font: var(--font-18-regular);
  font-size: clamp(15px, 5vw, 18px);

  @media (min-width: 1248px) {
    font-size: 18px;
  }
`;

const StyledBadge = styled.span`
  width: fit-content;
  padding: 6px 12px;
  border-radius: 50px;
  background-color: var(--purple-600);
  color: var(--white);
  font: var(--font-14-bold);
`;

const StyledImageArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 36px;

  @media (min-width: 1248px) {
    width: 720px;
    margin-top: 0;
    justify-content: center;
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 640px; 
  height: 162px;
  flex-shrink: 0;

  @media (max-width: 1247px) {
    max-width: 100%;
    height: auto;
    aspect-ratio: 640 / 162;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
    height: auto;
    aspect-ratio: 320 / 120;
  }
`;

const StyledMainCardsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledCursorSecond = styled.img`
  position: absolute;
  top: 8%;
  right: 28%;
  width: clamp(18px, 5vw, 32px);
  height: auto;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export default MainPoint2Section;