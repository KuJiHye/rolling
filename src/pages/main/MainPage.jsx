import styled from "styled-components";
import MainPointSection from "./MainPointSection";
import ExploreButton from "../../components/ExploreButton";
import exampleCard1 from "../../assets/ExampleCard.svg";
import exampleCard2 from "../../assets/ExampleCard2.svg";

const MainPage = () => {
  return (
    <StyledPageContainer>
      <MainPointSection
        point="01"
        title="누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요"
        description="로그인 없이 자유롭게 만들어요."
        image={exampleCard1}
        alt="롤링페이퍼 예시 카드들"
        isReverse={false}
      />

      <MainPointSection
        point="02"
        title="서로에게 이모지로 감정을 표현해보세요"
        description="롤링 페이퍼에 이모지를 추가할 수 있어요."
        image={exampleCard2}
        alt="이모지 기능 안내"
        isReverse={true}
      />

      <StyledButtonWrapper>
        <ExploreButton to="/list">구경해보기</ExploreButton>
      </StyledButtonWrapper>
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding: 60px 0;

  @media ${({ theme }) => theme.tablet} {
    padding: 48px 24px;
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 42px 20px 37px;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 48px;

  @media ${({ theme }) => theme.tablet} {
    padding: 0;
  }

  @media ${({ theme }) => theme.mobile} {
    margin-top: 24px;
    padding: 0;
  }
`;

export default MainPage;
