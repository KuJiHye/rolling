import { useEffect, useState, useCallback } from "react";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";
import { getRecipients } from "../api/index";

const StyledCardList = styled.ul`
  display: flex;
  gap: 40px;
  flex-direction: row;
`;
const StyledCarouselWindow = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavButton = styled.button`
  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};
`;

function RollingPaperList({ title, sort }) {
  const [allLists, setAllLists] = useState([]); // 전체 데이터를 담는 저장소
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0); //총 리스트 갯수
  const VIEW_COUNT = 4; // 화면에 보이는 개수
  const FETCH_LIMIT = 12; // 한 번에 가져올 양

  const loadMoreLists = useCallback(
    async (offset, isReset = false) => {
      try {
        const data = await getRecipients({
          limit: FETCH_LIMIT,
          offset: offset,
          sort: sort,
        });

        if (isReset) {
          setAllLists(data.results);
          setCurrentIndex(0);
        } else {
          setAllLists((prev) => [...prev, ...data.results]);
        }
        setTotalCount(data.count);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    },
    [sort],
  );

  useEffect(() => {
    const initialize = async () => {
      await loadMoreLists(0, true);
    };
    initialize();
  }, [loadMoreLists]);

  // 버튼 클릭 시 이동 로직
  const handleNext = () => {
    const nextIndex = currentIndex + 1;

    if (
      nextIndex + VIEW_COUNT > allLists.length &&
      allLists.length < totalCount
    ) {
      loadMoreLists(allLists.length, false);
    }

    if (nextIndex <= totalCount - VIEW_COUNT) {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  //현재 인덱스부터 4개만 잘라서 화면에 표시
  const visibleLists = allLists.slice(currentIndex, currentIndex + VIEW_COUNT);
  const isNoPrevData = currentIndex === 0;
  const isNoNextData = currentIndex >= totalCount - VIEW_COUNT;

  return (
    <div>
      <h1>
        {title} (전체: {totalCount}개 / 로드됨: {allLists.length}개)
      </h1>
      <StyledCarouselWindow>
        <NavButton onClick={handlePrev} $isHidden={isNoPrevData}>
          <span>&lt;</span>
        </NavButton>
        <StyledCardList>
          {visibleLists.map((list) => (
            <li key={list.id}>
              <RollingPaperCard list={list} />
            </li>
          ))}
        </StyledCardList>
        <NavButton onClick={handleNext} $isHidden={isNoNextData}>
          <span>&gt;</span>
        </NavButton>
      </StyledCarouselWindow>
    </div>
  );
}

export default RollingPaperList;
