import React from "react";
import styled from "styled-components";
import MainPoint1Section from "../components/MainPoint1Section"; 
import MainPoint2Section from "../components/MainPoint2Section"; 
import ExploreButton from "../components/ExploreButton";

const MainPage = () => {
  const handleExploreClick = () => {
    console.log("구경하기 페이지로 이동");
  };

  return (
    <StyledPageContainer>
      <MainPoint1Section />

      <MainPoint2Section isReverse={true} />

      <StyledButtonWrapper>
        <ExploreButton to="/list" onClick={handleExploreClick}>
          구경해보기
        </ExploreButton>
      </StyledButtonWrapper>
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px; 
  padding: 60px 0;
  align-items: center;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

export default MainPage;