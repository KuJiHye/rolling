import ExploreButton from "../components/ExploreButton";
import RollingPaperList from "../components/RollingPaperList";

function ListPage() {
  return (
    <>
      <RollingPaperList title="인기 롤링 페이퍼🔥" sort="like" />
      <RollingPaperList title="최근에 만든 롤링 페이퍼 ⭐️️" />
      <ExploreButton to="/post">나도 만들기</ExploreButton>
    </>
  );
}
export default ListPage;
