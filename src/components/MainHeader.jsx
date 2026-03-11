import logo from '../assets/Logo.svg';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const MainHeader = () => {
  const location = useLocation();
  const showCreateButton = location.pathname === '/' || location.pathname === '/list';

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledLogo to="/">
          <StyledLogoIcon src={logo} alt="Rolling Logo" referrerPolicy="no-referrer" />
        </StyledLogo>
        {showCreateButton && (
          <StyledCreateButton to="/post">
            롤링 페이퍼 만들기
          </StyledCreateButton>
        )}
      </StyledHeaderContent>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  background-color: var(--white);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const StyledHeaderContent = styled.div`
  width: 100%;
  max-width: 1199px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

const StyledLogoIcon = styled.img`
  width: 106px;
  height: 30px;
`;

const StyledCreateButton = styled(Link)`
  padding: 8px 16px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font: var(--font-16-bold);
  color: var(--gray-900);
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray-100);
  }
`;

export default MainHeader;