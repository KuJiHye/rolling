import { useEffect, useState } from "react";
import ExploreButton from "../../components/ExploreButton";
import RollingPaperList, { FETCH_LIMIT } from "./RollingPaperList";
import { getRecipients } from "../../api/axios";
import styled from "styled-components";

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function ListPage() {
  const [popular, setPopular] = useState({ results: [], count: 0 });
  const [recent, setRecent] = useState({ results: [], count: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [likeData, recentData] = await Promise.all([
          getRecipients({ limit: FETCH_LIMIT, sort: "like" }),
          getRecipients({ limit: FETCH_LIMIT }),
        ]);
        setPopular({ results: likeData.results, count: likeData.count });
        setRecent({ results: recentData.results, count: recentData.count });
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      } finally {
        setIsReady(true);
      }
    };
    fetchAll();
  }, []);

  return (
    <StyledMainContainer>
      <RollingPaperList
        title="인기 롤링 페이퍼🔥"
        sort="like"
        initialData={popular.results}
        initialCount={popular.count}
        isReady={isReady}
      />
      <RollingPaperList
        title="최근에 만든 롤링 페이퍼 ⭐️️"
        initialData={recent.results}
        initialCount={recent.count}
        isReady={isReady}
      />
      <StyledMargin />
      <ExploreButton to="/post">나도 만들어보기</ExploreButton>
      <StyledBottomMargin />
    </StyledMainContainer>
  );
}

const StyledMargin = styled.div`
  height: 64px;

  @media ${({ theme }) => theme.mobile} {
    height: 8px;
  }
`;

const StyledBottomMargin = styled.div`
  @media ${({ theme }) => theme.tablet} {
    height: 40px;
  }
`;
export default ListPage;
