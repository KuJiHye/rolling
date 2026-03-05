import axios from "axios";
import { useEffect, useState } from "react";
import RollingPaperCard from "./RollingPaperCard";
import styled from "styled-components";

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
  const [currentIndex, setCurrentIndex] = useState(0); // API offset으로 사용할 상태
  const [totalCount, setTotalCount] = useState(0); // 서버에 있는 전체 데이터 개수

  // 인덱스(offset)를 받아서 API를 호출하는 함수
  const loadLists = async (offsetIndex) => {
    try {
      const response = await axios.get(
        "https://rolling-api.vercel.app/23-5/recipients/",
        {
          params: {
            limit: 4,
            offset: offsetIndex,
            sort: sort,
          },
        },
      );
      setLists(response.data.results);
      setTotalCount(response.data.count); // 전체 데이터 개수 저장 (버튼 숨김 계산용)
    } catch (error) {
      console.error("데이터 로딩 중 오류 발생:", error);
    }
  };

  // 💡 currentIndex가 바뀔 때마다 서버에 새로운 4개를 요청합니다.
  useEffect(() => {
    loadLists(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    // 전체 개수(totalCount)를 기준으로 끝에 도달하지 않았을 때만 이동
    if (currentIndex < totalCount - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isNoPrevData = currentIndex === 0;
  // 전체 데이터가 4개 이하이거나, 현재 위치가 끝에 도달하면 오른쪽 버튼 숨김
  const isNoNextData = currentIndex >= totalCount - 4 || totalCount <= 4;

  return (
    <div>
      <h1>{title}</h1>
      <CardList>
        <NavButton onClick={handlePrev} $isHidden={isNoPrevData}>
          <span>&lt;</span>
        </NavButton>

        {/* 프론트엔드에서 slice 할 필요 없이, 서버가 준 4개를 그대로 그립니다. */}
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
