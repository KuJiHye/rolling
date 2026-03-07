import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRecipients } from "../api/index";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";

const CardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px; /* 카드 사이의 간격 */
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

  useEffect(() => {
    setInputValue(keywordFromUrl);
  }, [keywordFromUrl]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getRecipients({
          limit: 12,
          sort: sort === "like" ? "like" : "",
          search: keywordFromUrl,
        });
        setAllData(response.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sort, keywordFromUrl]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(inputValue)}`);
    }
  };

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
        <button onClick={() => setSort("")}>최신순</button>
        <button onClick={() => setSort("like")}>인기순</button>
      </div>

      <h2>
        "{keywordFromUrl}" 검색 결과: {allData.length}개 (
        {sort === "like" ? "인기순" : "최신순"})
      </h2>

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <CardGrid>
          {allData.map((list) => (
            <li key={list.id}>
              <RollingPaperCard list={list} />
            </li>
          ))}
        </CardGrid>
      )}

      {!isLoading && allData.length === 0 && <p>검색 결과가 없습니다.</p>}
    </div>
  );
}

export default SearchList;
