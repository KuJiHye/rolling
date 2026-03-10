import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRecipients } from "../api/index";
import RollingPaperCard from "./RollingPaperCard";
import Pagination from "./Pagination";
import SearchIc from "../assets/ic_search.svg";

function SearchList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keywordFromUrl = searchParams.get("keyword") || "";

  const [inputValue, setInputValue] = useState(keywordFromUrl);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 12;

  useEffect(() => {
    setInputValue(keywordFromUrl);
    setCurrentPage(1);
  }, [keywordFromUrl]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. 최대한 많은 데이터를 가져오기 위해 limit을 크게 설정합니다.
        // sort가 'like'라면 서버가 인기순으로 정렬된 데이터를 줍니다.
        const response = await getRecipients({
          limit: 500, // 전체 데이터를 가져오기 위해 충분히 큰 값 설정
          sort: sort === "like" ? "like" : "",
        });

        let fetchedData = response.results;

        // 2. 키워드가 있다면 가져온 전체 데이터에서 필터링을 수행합니다.
        if (keywordFromUrl) {
          fetchedData = fetchedData.filter((item) =>
            item.name.toLowerCase().includes(keywordFromUrl.toLowerCase()),
          );
        }

        // 3. 최신순 정렬일 경우 (서버 기본값이 최신순이 아닐 수 있으므로 클라이언트 정렬 권장)
        if (sort === "") {
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
  }, [sort, keywordFromUrl]); // sort나 URL 키워드가 바뀔 때마다 실행

  const handleSearch = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setSort("none");
      setCurrentPage(1);
      navigate(`/search?keyword=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setInputValue("");
    navigate("/search");
  };

  const offset = (currentPage - 1) * LIMIT;
  const currentItems = allData.slice(offset, offset + LIMIT);

  return (
    <StyledSearchContainer>
      <StyledInputContainer>
        <StyledSearchIcon src={SearchIc} alt="검색 돋보기" />
        <StyledSearchInput
          type="text"
          placeholder="이름을 입력하고 엔터를 누르세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearch}
        />
      </StyledInputContainer>

      <StyledSortFilterBox>
        <StyledFilterButton
          onClick={() => handleSortChange("")}
          $isActive={sort === ""}
        >
          최신순
        </StyledFilterButton>
        <StyledFilterButton
          onClick={() => handleSortChange("like")}
          $isActive={sort === "like"}
        >
          인기순
        </StyledFilterButton>
      </StyledSortFilterBox>

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <StyledCardGrid>
            {currentItems.map((card) => (
              <li key={card.id}>
                <RollingPaperCard card={card} />
              </li>
            ))}
          </StyledCardGrid>

          <Pagination
            totalCount={allData.length}
            limit={LIMIT}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
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
`;

const StyledCardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const StyledInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledSearchInput = styled.input`
  width: 1160px;
  height: 48px;
  border-radius: 16px;
  border: none;
  background-color: var(--purple-100);
  padding: 12px 40px;
  margin-top: 16px;
  margin-bottom: 12px;
  font: var(--font-16-regular);

  &:focus {
    outline: 1px solid var(--purple-600);
  }
`;

const StyledSearchIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
`;

const StyledSortFilterBox = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const StyledFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 42px;
  border: 1px solid var(--gray-200);
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${(props) =>
    props.$isActive ? "var(--purple-600)" : "var(--white)"};
  color: ${(props) => (props.$isActive ? "var(--white)" : "var(--gray-900)")};
  border-color: ${(props) =>
    props.$isActive ? "var(--purple-600)" : "var(--gray-200)"};

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? "var(--purple-700)" : "var(--gray-100)"};
  }
`;

export default SearchList;
