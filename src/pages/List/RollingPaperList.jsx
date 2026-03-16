import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";
import { getRecipients } from "../../api/index";
import ArrowRight from "../../assets/arrow_right.svg";
import ArrowLeft from "../../assets/arrow_left.svg";
import SearchIc from "../../assets/ic_search.svg";

function RollingPaperList({ title, sort }) {
  const [allLists, setAllLists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const VIEW_COUNT = 4;
  const FETCH_LIMIT = 100;

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    if (!isTablet) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상(스크롤 끝부분)이 화면에 보이고, 아직 불러올 데이터가 남았다면
        if (entries[0].isIntersecting && allLists.length < totalCount) {
          loadMoreLists(allLists.length, false);
        }
      },
      { threshold: 0, rootMargin: "0px 3000px 0px 0px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isTablet, allLists.length, totalCount, loadMoreLists]);

  // 버튼 클릭 시 이동 로직
  const handleNext = () => {
    const nextIndex = currentIndex + VIEW_COUNT;
    const PREFETCH_THRESHOLD = VIEW_COUNT * 3;

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

  // 렌더링 리스트 분기 처리: 태블릿 이하면 전부 렌더링, 데스크탑이면 4개만 렌더링
  const renderedLists = isTablet
    ? allLists
    : allLists.slice(currentIndex, currentIndex + VIEW_COUNT);

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
          {renderedLists.map((card) => (
            <StyledCardItem key={card.id}>
              <RollingPaperCard card={card} $variant="main" />
            </StyledCardItem>
          ))}
          {isTablet && allLists.length < totalCount && (
            <StyledObserverTarget ref={observerRef} />
          )}
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
  width: 1160px;
  flex-direction: column;
  gap: 16px;
  display: flex;

  @media ${({ theme }) => theme.tablet} {
    width: 100%;
    padding: 0 24px;
    overflow: visible;
  }
  @media ${({ theme }) => theme.mobile} {
    margin-top: 20px;
    gap: 12px;
  }
`;
const StyledListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media ${({ theme }) => theme.mobile} {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 24px;
  }
`;

const StyledSearchWrapper = styled.div`
  position: relative;

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
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

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

const StyledCardList = styled.ul`
  display: flex;
  gap: 20px;
  width: 100%;
  min-height: 280px;
  list-style: none;

  @media ${({ theme }) => theme.tablet} {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: 0 -24px;
    padding: 0 24px;
    width: auto;
    scroll-padding-left: 24px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledCardItem = styled.li`
  list-style: none;
  flex: 0 0 auto;

  @media ${({ theme }) => theme.tablet} {
    scroll-snap-align: start;
  }
`;

const StyledCarouselWindow = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;

  @media ${({ theme }) => theme.tablet} {
    display: contents;
  }
`;

const StyledListTitle = styled.h1`
  font: var(--font-24-bold);
  @media ${({ theme }) => theme.mobile} {
    font: var(--font-20-bold);
  }
`;

const StyledLeftButton = styled.button`
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.08);
  right: 100%;
  top: 50%;
  transform: translate(50%, -70%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;

  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};

  @media ${({ theme }) => theme.tablet} {
    display: none;
  }
`;
const StyledRightButton = styled.button`
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.08);
  left: 100%;
  top: 50%;
  transform: translate(-50%, -70%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;

  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};

  @media ${({ theme }) => theme.tablet} {
    display: none;
  }
`;

const StyledObserverTarget = styled.div`
  min-width: 20px;
  height: 100%;
  flex-shrink: 0;
`;

export default RollingPaperList;
