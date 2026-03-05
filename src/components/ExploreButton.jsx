import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/list')}>
      구경해보기
    </button>
  );
};

export default ExploreButton;