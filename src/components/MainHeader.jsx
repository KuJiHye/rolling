/**
 서비스의 공통 헤더 컴포넌트
 - 모든 페이지: 로고 표시
 - 메인 페이지('/')에서만: '롤링 페이퍼 만들기' 버튼 표시
 **/
import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import CreateButton from './CreateButton';

const MainHeader = () => {
  const location = useLocation();

  const showCreateButton = location.pathname === '/' || location.pathname === '/list';

  return (
    <header>
      <Logo />
      {showCreateButton && <CreateButton />}
    </header>
  );
};

export default MainHeader;