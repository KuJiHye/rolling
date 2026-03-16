import styled from 'styled-components';

const MainPointSection = ({ point, title, description, image, alt, isReverse }) => {
  const isPoint1 = point === "01";

  return (
    <StyledSectionContainer $isReverse={isReverse} $isPoint1={isPoint1}>
      <StyledContentWrapper $isPoint1={isPoint1}>
        <StyledBadge>Point. {point}</StyledBadge>
        <StyledTextGroup>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
        </StyledTextGroup>
      </StyledContentWrapper>

      <StyledImageContainer $isPoint1={isPoint1}>
        <StyledMainCardsImage 
          src={image} 
          alt={alt} 
          $isPoint1={isPoint1} 
        />
      </StyledImageContainer>
    </StyledSectionContainer>
  );
};

/* --- 섹션 컨테이너 --- */
const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: ${({ $isReverse }) => ($isReverse ? 'row-reverse' : 'row')};
  justify-content: ${({ $isPoint1 }) => ($isPoint1 ? 'space-evenly' : 'center')};
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  height: 324px;
  background-color: var(--surface);
  border-radius: 16px;
  overflow: hidden;

  @media ${({ theme }) => theme.tablet} {
    width: 100%;
    max-width: 720px; 
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  @media ${({ theme }) => theme.mobile} { 
    width: 100%;
    height: ${({ $isPoint1 }) => ($isPoint1 ? '352px' : '362px')};
  }
`;

/* --- 텍스트 영역 --- */
const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  justify-content: center;
  flex-shrink: 1; 
  max-width: 474px;
  height: 204px;
  margin-top: 60px;
  margin-left: ${({ $isPoint1 }) => ($isPoint1 ? '60px' : '0')};

  @media ${({ theme }) => theme.tablet} {
    padding: 40px 0 0 0;
    margin-top: 0; 
    margin-left: 0;
  }

  @media ${({ theme }) => theme.mobile} { 
    width: 100%;
    padding: 24px;
  }
`;

const StyledTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; 

  @media ${({ theme }) => theme.mobile} { 
    gap: 4px;
  }
`;

const StyledTitle = styled.h2`
  margin: 0;
  color: var(--gray-900);
  width: 260px;
  font: var(--font-24-bold);
  line-height: 36px;
  letter-spacing: -0.01em;

  @media ${({ theme }) => theme.tablet} { width: auto; }
  @media ${({ theme }) => theme.mobile} { 
    font: var(--font-18-bold);
    line-height: 28px;
  }
`;

const StyledDescription = styled.p`
  margin: 0;
  color: var(--gray-500);
  width: ${({ $isPoint1 }) => ($isPoint1 ? '218px' : '288px')};
  font: var(--font-18-regular);
  line-height: 28px;

  @media ${({ theme }) => theme.tablet} { width: auto; }
  @media ${({ theme }) => theme.mobile} { 
    font: var(--font-15-regular);
    line-height: 22px;
  }
`;

const StyledBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-600);
  color: var(--white);
  border-radius: 50px;
  width: fit-content;
  min-width: 80px;
  min-height: 32px;
  padding: 6px 12px;
  font: var(--font-14-bold); 

  @media ${({ theme }) => theme.mobile} { 
    min-height: 28px;
  }
`;

/* --- 이미지 영역 --- */
const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 1; 
  width: ${({ $isPoint1 }) => ($isPoint1 ? '100%' : 'fit-content')};
  max-width: 720px;
  height: 204px;
  margin-top: 60px;
  margin-right: ${({ $isPoint1 }) => ($isPoint1 ? '0' : '125px')};

  @media ${({ theme }) => theme.tablet} {
    width: 720px;
    height: auto;
    margin: 36px 0 40px 0;
  }

  @media ${({ theme }) => theme.mobile} { 
    width: 100%;
    margin-top: ${({ $isPoint1 }) => ($isPoint1 ? '26px' : '24px')};
  }
`;

const StyledMainCardsImage = styled.img`
  width: ${({ $isPoint1 }) => ($isPoint1 ? '640px' : '470px')};
  height: ${({ $isPoint1 }) => ($isPoint1 ? '162px' : '204px')};
  object-fit: contain;

  @media ${({ theme }) => theme.mobile} { 
    width: ${({ $isPoint1 }) => ($isPoint1 ? '355px' : '260px')};
    height: ${({ $isPoint1 }) => ($isPoint1 ? '90px' : '113px')};
  }
`;

export default MainPointSection;