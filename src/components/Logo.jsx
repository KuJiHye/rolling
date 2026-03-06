//서비스 로고를 표시하며, 클릭 시 메인 페이지('/')로 이동하는 컴포넌트
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../assets/Logo.svg';

const Logo = () => {
  const navigate = useNavigate();

  //서비스 로고를 표시하며, 클릭 시 메인 페이지('/')로 이동하는 컴포넌트
  const handleMainPageNavigate = () => {
    navigate('/');
  };

  return (
    <img 
      src={MainLogo} 
      alt="로고" 
      onClick={handleMainPageNavigate}
    />
  );
};

export default Logo; 