import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../assets/Logo.svg';

const Logo = () => {
  const navigate = useNavigate();

  const handleMainPageNavigate = () => {
    navigate('/');
  };

  return (
    <StyledLogoWrapper onClick={handleMainPageNavigate}>
      <StyledLogoIcon 
        src={MainLogo} 
        alt="로고" 
      />
    </StyledLogoWrapper>
  );
};

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0; 
`;
const StyledLogoIcon = styled.img`
  width: 106px; 
  height: 30px;
  object-fit: contain; 
`;

export default Logo;