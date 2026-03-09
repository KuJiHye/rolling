import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRecipients } from "../api/index";
import RollingPaperCard from "./RollingPaperCard";
import Pagination from "./Pagination";
import styled from "styled-components";

const CardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

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
        const response = await getRecipients({
          limit: 100,
          sort: sort === "like" ? "like" : "",
        });

        let finalData = response.results;
        if (!sort && keywordFromUrl) {
          finalData = response.results.filter((item) =>
            item.name.toLowerCase().includes(keywordFromUrl.toLowerCase())
          );
        }
        setAllData(finalData);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sort, keywordFromUrl]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setSort("");
      navigate(`/search?keyword=${encodeURIComponent(inputValue)}`);
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
    <div>
      <div>
        <input
          type="text"
          placeholder="이름을 입력하고 엔터를 누르세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div>
        <button onClick={() => handleSortChange("")}>최신순</button>
        <button onClick={() => handleSortChange("like")}>인기순</button>
      </div>

      <h2>
        {keywordFromUrl ? `"${keywordFromUrl}" 검색 결과: ` : "전체 목록: "} 
        {allData.length}개 ({sort === "like" ? "인기순" : "최신순"})
      </h2>

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <CardGrid>
            {currentItems.map((list) => (
              <li key={list.id}>
                <RollingPaperCard list={list} />
              </li>
            ))}
          </CardGrid>

          <Pagination
            totalCount={allData.length}
            limit={LIMIT}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {!isLoading && allData.length === 0 && <p>검색 결과가 없습니다.</p>}
    </div>
  );
}

export default SearchList;