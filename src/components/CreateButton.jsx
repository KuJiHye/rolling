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