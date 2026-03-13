import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getRecipients } from "../api/index";
import RollingPaperCard, { StyledCardWrapper } from "./RollingPaperCard";
import Pagination from "./Pagination";
import SearchIc from "../assets/ic_search.svg";
import LoadingImg from "../assets/loading.png";

function SearchList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keywordFromUrl = searchParams.get("keyword") || "";
  const sortFromUrl = searchParams.get("sort") || "";

  const [inputValue, setInputValue] = useState(keywordFromUrl);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 12;

  // URL 키워드가 바뀌면 입력창과 페이지 초기화
  useEffect(() => {
    setInputValue(keywordFromUrl);
    setCurrentPage(1);
  }, [keywordFromUrl, sortFromUrl]);

  useEffect(() => {
    const fetchData = async () => {
      setAllData([]);
      setIsLoading(true);

      try {
        const response = await getRecipients({
          limit: 500,
          sort: sortFromUrl === "like" ? "like" : "",
        });

        let fetchedData = response.results;

        if (
          keywordFromUrl &&
          sortFromUrl !== "like" &&
          sortFromUrl !== "latest"
        ) {
          fetchedData = fetchedData.filter((item) =>
            item.name.toLowerCase().includes(keywordFromUrl.toLowerCase()),
          );
        }

        if (sortFromUrl === "" || sortFromUrl === "latest") {
          fetchedData = [...fetchedData].sort((a, b) => b.id - a.id);
        }

        setAllData(fetchedData);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keywordFromUrl, sortFromUrl]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleSortChange = (newSort) => {
    const sortValue = newSort === "" ? "latest" : "like";
    setInputValue("");
    navigate(`/search?sort=${sortValue}`);
  };

  const offset = (currentPage - 1) * LIMIT;
  const currentItems = allData.slice(offset, offset + LIMIT);

  return (
    <StyledSearchContainer>
      <StyledSearchHeader>
        <StyledSortFilterBox>
          <StyledFilterButton
            onClick={() => handleSortChange("")}
            $isActive={sortFromUrl === "latest"}
          >
            최신순
          </StyledFilterButton>
          <StyledFilterButton
            onClick={() => handleSortChange("like")}
            $isActive={sortFromUrl === "like"}
          >
            인기순
          </StyledFilterButton>
        </StyledSortFilterBox>
        <StyledInputContainer>
          <StyledSearchIcon src={SearchIc} alt="검색 돋보기" />
          <StyledSearchInput
            type="text"
            placeholder="입력하고 엔터를 눌러주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </StyledInputContainer>
      </StyledSearchHeader>

      {isLoading ? (
        <StyledLoading>
          <StyledLoadingImg src={LoadingImg} />
          <StyledLoadingText>로딩 중...</StyledLoadingText>
        </StyledLoading>
      ) : (
        <>
          <StyledCardGrid>
            {currentItems.map((card) => (
              <StyledCard key={card.id}>
                <RollingPaperCard card={card} $variant="search" />
              </StyledCard>
            ))}
          </StyledCardGrid>

          {allData.length > 0 && (
            <Pagination
              totalCount={allData.length}
              limit={LIMIT}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {!isLoading && allData.length === 0 && <p>검색 결과가 없습니다.</p>}
    </StyledSearchContainer>
  );
}

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
  padding: 0 24px;

  @media ${({ theme }) => theme.tablet} {
    padding: 0 24px;
  }

  /* 모바일: 좌우 여백 12px */
  @media ${({ theme }) => theme.mobile} {
    padding: 0 20px;
  }
`;

const StyledSearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1160px;
  width: 100%;
  gap: 8px;

  @media ${({ theme }) => theme.tablet} {
    width: 566px;
    margin: 0 24px;
    position: sticky;
  }
  @media ${({ theme }) => theme.mobile} {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 8px;
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 8px;
  }
`;

const StyledCardGrid = styled.ul`
  display: grid;
  max-width: 1160px;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  align-items: center;
  justify-content: center;

  /* 태블릿: 2열로 변경 및 자유로운 너비 */
  @media ${({ theme }) => theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  /* 모바일: 1열로 변경 및 자유로운 너비 */
  @media ${({ theme }) => theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
    width: 100%; /* 모바일에서도 100% 확인 */
    padding: 0;
  }
`;
const StyledCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 20px;
  border: none;
  background-color: var(--purple-100);
  padding: 12px 40px;
  font: var(--font-16-regular);

  &:focus {
    outline: 1px solid var(--purple-600);
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
    height: 40px;
    font: var(--font-14-regular);
  }
`;

const StyledSearchIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
`;

const StyledSortFilterBox = styled.div`
  display: flex;
  gap: 4px;
`;

const StyledFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 48px;
  border: 1px solid var(--gray-200);
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.2s ease;
  font: var(--font-16-bold);

  background-color: ${(props) =>
    props.$isActive ? "var(--purple-600)" : "var(--white)"};
  color: ${(props) => (props.$isActive ? "var(--white)" : "var(--gray-900)")};
  border-color: ${(props) =>
    props.$isActive ? "var(--purple-600)" : "var(--gray-200)"};

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? "var(--purple-700)" : "var(--gray-100)"};
  }

  @media ${({ theme }) => theme.mobile} {
    font: var(--font-12-regular);
    width: 64px;
    height: 40px;
  }
`;

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  gap: 12px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoadingImg = styled.img`
  height: 24px;
  animation: ${rotate} 1s linear infinite;
`;

const StyledLoadingText = styled.span`
  font: var(--font-20-bold);
  color
`;

export default SearchList;
