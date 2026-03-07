import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreButton = ({ to, children }) => {
  const navigate = useNavigate();

  ///버튼 클릭 시 목록 페이지 이동을 처리하는 핸들러 함수
  const handleListPageNavigate = () => {
    navigate(to);
  };

  return <button onClick={handleListPageNavigate}>{children}</button>;
};

export default ExploreButton;
