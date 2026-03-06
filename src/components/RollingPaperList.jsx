import { useEffect, useState } from "react";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";
import { getRecipients } from "../api/index";

const CardList = styled.ul`
  display: flex;
  gap: 40px;
  flex-direction: row;
`;

const NavButton = styled.button`
  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};
`;

function RollingPaperList({ title, sort }) {
  const [lists, setLists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadLists = async (offsetIndex) => {
      try {
        const data = await getRecipients({
          limit: 4,
          offset: offsetIndex,
          sort: sort,
        });
        setLists(data.results);
        setTotalCount(data.count);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };

    loadLists(currentIndex);
  }, [currentIndex, sort]);

  //오른쪽 버튼 클릭 시 데이터 이동
  const handleNext = () => {
    if (currentIndex < totalCount - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  //왼쪽 버튼 클릭 시 데이터 이동
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isNoPrevData = currentIndex === 0;
  const isNoNextData = currentIndex >= totalCount - 4 || totalCount <= 4;

  return (
    <div>
      <h1>{title}</h1>
      <CardList>
        <NavButton onClick={handlePrev} $isHidden={isNoPrevData}>
          <span>&lt;</span>
        </NavButton>
        {lists.map((list) => (
          <li key={list.id}>
            <RollingPaperCard list={list} />
          </li>
        ))}

        <NavButton onClick={handleNext} $isHidden={isNoNextData}>
          <span>&gt;</span>
        </NavButton>
      </CardList>
    </div>
  );
}

export default RollingPaperList;
