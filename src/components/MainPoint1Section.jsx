import styled from 'styled-components';
import exampleCard from '../assets/ExampleCard.svg';
import CURSOR_ICON from '../assets/CursorIcon.svg';

const MainPoint1Section = ({ isReverse = false }) => {
  return (
    <StyledSectionContainer $isReverse={isReverse}>
      <StyledContentWrapper $isReverse={isReverse}>
        <StyledBadge>Point. 01</StyledBadge>
        <StyledTextContainer> 
          <StyledTitle>누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요</StyledTitle>
          <StyledDescription>로그인 없이 자유롭게 만들어요.</StyledDescription>
        </StyledTextContainer>
      </StyledContentWrapper>

      <StyledImageArea>
        <StyledImageWrapper>
          <StyledMainCardsImage src={exampleCard} alt="롤링페이퍼 예시 카드들" />
          <StyledCursorFirst src={CURSOR_ICON} alt="마우스 커서 1" />
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
  margin: 0 auto 48px auto;
  overflow: hidden;
 
  @media ${({ theme }) => theme.pc} {
    flex-direction: ${({ $isReverse }) => ($isReverse ? 'row-reverse' : 'row')};
    justify-content: space-between;
  }

  @media ${({ theme }) => theme.mainTablet} {
    padding: 40px;
  }

  @media ${({ theme }) => theme.mainMobile} {
    padding: 24px;
    width: calc(100% - 48px); 
  }
`;

const StyledContentWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  gap: 16px;
  width: 100%;
  
  @media ${({ theme }) => theme.pc} {
    margin-left: ${({ $isReverse }) => ($isReverse ? '0' : '60px')};
    margin-right: ${({ $isReverse }) => ($isReverse ? '60px' : '0')};
    width: 268px;
    margin-left: 60px; 
    margin-top: 60;
  }

  @media ${({ theme }) => theme.mainTablet} {
    max-width: 474px;
    min-height: 120px;
    padding: 40px 0 0 40px; 
  }
    
  @media ${({ theme }) => theme.mainMobile} {
    padding: 24px 24px 0 24px;
    max-width: 100%;
  }
`;

const StyledTitle = styled.h2`
  color: var(--gray-900);
  margin: 0;
  word-break: keep-all; 
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
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%; 
  height: auto;
  flex-shrink: 0;
  aspect-ratio: 640 / 162;

  @media ${({ theme }) => theme.mainTablet} {
    width: 100%;
  }

  @media ${({ theme }) => theme.mainMobile} {
    aspect-ratio: 320 / 120;
  }
`;

const StyledMainCardsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media ${({ theme }) => theme.mobile} {
    object-fit: cover;
  }
`;

const StyledCursorFirst = styled.img`
  position: absolute;
  top: 40%;
  right: 12%;
  width: clamp(18px, 5vw, 32px);
  height: auto;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export default MainPoint1Section;