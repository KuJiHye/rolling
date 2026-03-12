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
          <StyledLogoIcon src={logo} alt="Rolling Logo"/>
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
  height: 62px;
  background-color: var(--white);
  border-bottom: 1px solid #EDEDED;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1199px; 
  height: 62px;
  padding: 11px 24px; 
  margin: 0 auto;
`;

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const StyledLogoIcon = styled.img`
  width: 106px;
  height: 30px;
`;

const StyledCreateButton = styled(Link)`
d isplay: flex;
  justify-content: center;
  align-items: center;
  width: 151px;
  height: 40px;
  padding: 8px 16px;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 6px;

  line-height: 26px;
  text-align: center;
  letter-spacing: -0.01em;
  font: var(--font-16-bold);
  color: var(--gray-900);
  text-decoration: none;
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--gray-100);
    border-color: var(--gray-400);
  }

  &:active {
    background-color: var(--gray-200);
  }
`;
export default MainHeader;