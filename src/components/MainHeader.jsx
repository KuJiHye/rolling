import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from './Logo'; 
import CreateButton from './CreateButton';

const MainHeader = () => {
  const location = useLocation();
  const showCreateButton = location.pathname === '/' || location.pathname === '/list';

  return (
    <StyledHeader>
      <StyledHeaderContent>
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
  
  width: 100%;
  max-width: 1200px; 
  height: 100%;
  padding: 0 24px;  
  box-sizing: border-box;
`;

export default MainHeader;