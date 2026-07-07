import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";
import { getRecipients } from "../../api/axios";
import ArrowRight from "../../assets/arrow_right.svg";
import ArrowLeft from "../../assets/arrow_left.svg";
import SearchIc from "../../assets/ic_search.svg";

export const FETCH_LIMIT = 12;

function RollingPaperList({
  title,
  sort,
  initialData = [],
  initialCount = 0,
  isReady = false,
}) {
  const [extraLists, setExtraLists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const VIEW_COUNT = 4;

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const observerRef = useRef(null);
  const scrollRef = useRef(null);
  const isFetchingRef = useRef(false);

  const allLists = useMemo(
    () => [...initialData, ...extraLists],
    [initialData, extraLists],
  );
  const totalCount = initialCount;

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMoreLists = useCallback(
    async (offset) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        const data = await getRecipients({
          limit: FETCH_LIMIT,
          offset,
          sort,
        });
        setExtraLists((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      } finally {
        isFetchingRef.current = false;
      }
    },
    [sort],
  );

  useEffect(() => {
    if (!isTablet) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상(스크롤 끝부분)이 컨테이너 우측 여백 안에 들어오면(끝 도달 전 프리페치)
        if (entries[0].isIntersecting && allLists.length < totalCount) {
          loadMoreLists(allLists.length);
        }
      },
      {
        root: scrollRef.current,
        threshold: 0,
        rootMargin: "0px 800px 0px 0px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isTablet, allLists.length, totalCount, loadMoreLists]);

  // 데스크톱: 현재 창이 로드 끝에 가까워지면 미리 이어 로드 (연타해도 자가 치유)
  useEffect(() => {
    if (isTablet) return;
    if (
      allLists.length < currentIndex + VIEW_COUNT * 3 &&
      allLists.length < totalCount
    ) {
      loadMoreLists(allLists.length);
    }
  }, [isTablet, currentIndex, allLists.length, totalCount, loadMoreLists]);

  // 버튼 클릭 시 이동 로직
  const handleNext = () => {
    const nextIndex = currentIndex + VIEW_COUNT;
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

  // 렌더링 리스트 분기 처리: 태블릿 이하면 전부 렌더링, 데스크탑이면 항상 4칸 고정
  // (아직 로드 안 된 칸은 undefined → RollingPaperCard가 스켈레톤으로 표시 → 깜빡임 방지)
  const renderedLists = isTablet
    ? allLists
    : Array.from({ length: VIEW_COUNT }, (_, i) => allLists[currentIndex + i]);

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

        <StyledCardList ref={scrollRef}>
          {!isReady
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <StyledCardItem key={i}>
                    <RollingPaperCard isLoading={true} $variant="main" />
                  </StyledCardItem>
                ))
            : renderedLists.map((card, i) => (
                <StyledCardItem key={card?.id ?? `ph-${currentIndex + i}`}>
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
