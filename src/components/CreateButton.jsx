//클릭 시 롤링 페이퍼 생성 페이지('/post')로 이동하는 버튼 컴포넌트
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/post')}>
      롤링 페이퍼 만들기
    </button>
  );
};

export default CreateButton;