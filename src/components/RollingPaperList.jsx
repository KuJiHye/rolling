import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";
import { getRecipients } from "../api/index";
import ArrowRight from "../assets/arrow_right.svg";
import ArrowLeft from "../assets/arrow_left.svg";
import SearchIc from "../assets/ic_search.svg";

function RollingPaperList({ title, sort }) {
  const [allLists, setAllLists] = useState([]); // 전체 데이터를 담는 저장소
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0); //총 리스트 갯수
  const VIEW_COUNT = 4; // 화면에 보이는 개수
  const FETCH_LIMIT = 100; // 한 번에 가져올 양

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    const nextIndex = currentIndex + VIEW_COUNT;
    const PREFETCH_THRESHOLD = VIEW_COUNT * 2;

    if (
      nextIndex + PREFETCH_THRESHOLD > allLists.length &&
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
      setCurrentIndex((prev) => prev - VIEW_COUNT);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const visibleLists = allLists.slice(currentIndex, currentIndex + VIEW_COUNT);
  const isNoPrevData = currentIndex === 0;
  const isNoNextData = currentIndex >= totalCount - VIEW_COUNT;

  return (
    <StyledSection>
      <StyledListHeader>
        <StyledListTitle>{title}</StyledListTitle>
        <StyledSearchWrapper>
          {title === "인기 롤링 페이퍼🔥" && (
            <>
              <StyledSearchIcon src={SearchIc} alt="검색 돋보기" />
              <StyledSearchInput
                type="text"
                placeholder="검색어를 입력 후 Enter를 눌러주세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />
            </>
          )}
        </StyledSearchWrapper>
      </StyledListHeader>
      <StyledCarouselWindow>
        <StyledLeftButton onClick={handlePrev} $isHidden={isNoPrevData}>
          <span>
            <img src={ArrowLeft} alt="왼쪽 버튼" />
          </span>
        </StyledLeftButton>
        <StyledCardList>
          {visibleLists.map((card) => (
            <li key={card.id}>
              <RollingPaperCard card={card} />
            </li>
          ))}
        </StyledCardList>
        <StyledRightButton onClick={handleNext} $isHidden={isNoNextData}>
          <span>
            <img src={ArrowRight} alt="오른쪽 버튼" />
          </span>
        </StyledRightButton>
      </StyledCarouselWindow>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  margin-top: 50px;
  flex-direction: column;
  gap: 16px;
  display: flex;
`;
const StyledListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledSearchWrapper = styled.div`
  position: relative;
`;

const StyledSearchIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
`;

const StyledSearchInput = styled.input`
  font: var(--font-16-regular);
  width: 325px;
  height: 42px;
  border-radius: 12px;
  background-color: var(--purple-100);
  border: none;
  padding: 9px 16px;
  padding-left: 37px;

  &:focus {
    outline: 1px solid var(--purple-600);
  }
`;

const StyledCardList = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: row;
  min-width: 1160px;
  min-height: 260px;
`;
const StyledCarouselWindow = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const StyledListTitle = styled.h1`
  font: var(--font-24-bold);
`;

const StyledLeftButton = styled.button`
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.08);
  right: 100%;
  top: 50%;
  transform: translate(50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;

  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};
`;
const StyledRightButton = styled.button`
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.08);
  left: 100%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;

  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};
`;

export default RollingPaperList;
