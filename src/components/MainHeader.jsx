import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo'; 
import CreateButton from './CreateButton';

const MainHeader = () => {
  const location = useLocation();
  const showCreateButton = location.pathname === '/' || location.pathname === '/list';
  const isListPage = location.pathname === '/list';

  return (
    <StyledHeader>
      <StyledHeaderContent $isListPage={isListPage}>
        <Logo /> 
        {showCreateButton && <CreateButton />}
      </StyledHeaderContent>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 64px; 
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
  justify-content: space-between; 
  align-items: center;
  width: 1248px; 
  height: 62px;
  padding: 11px 24px; 
  margin: 0 auto;

  @media ${({ theme }) => theme.tablet} {
    padding: ${({ $isListPage }) =>
    $isListPage ? "11px 60px 11px 24px" : "11px 24px"};
  }

  @media ${({ theme }) => theme.mobile} {
    padding: ${({ $isListPage }) =>
    $isListPage ? "11px 60px 11px 20px" : "11px 20px"};
  }
`;

export default MainHeader;