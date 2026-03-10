import ExploreButton from "../components/ExploreButton";
import RollingPaperList from "../components/RollingPaperList";
import styled from "styled-components";

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function ListPage() {
  return (
    <StyledMainContainer>
      <RollingPaperList title="인기 롤링 페이퍼🔥" sort="like" />
      <RollingPaperList title="최근에 만든 롤링 페이퍼 ⭐️️" />
      <ExploreButton to="/post">나도 만들기</ExploreButton>
    </StyledMainContainer>
  );
}
export default ListPage;
