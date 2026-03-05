import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../assets/Logo.svg';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img 
      src={MainLogo} 
      alt="로고" 
      onClick={() => navigate('/')} 
    />
  );
};

export default Logo; 