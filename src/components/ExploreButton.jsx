import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ExploreButton = ({ to, children, onClick }) => {
  const navigate = useNavigate();

  const handleListPageNavigate = () => {
    if (onClick) onClick();
    navigate(to);
  };

  return <StyledButton to={to} onClick={handleListPageNavigate}>
    {children}
  </StyledButton>;
};

const StyledButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 56px;
  padding: 14px 24px;
  
  background-color: var(--purple-600);
  border-radius: 12px;
  
  font: var(--font-18-bold);
  color: var(--white);
  text-decoration: none; // Link 태그의 기본 밑줄 제거
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--purple-700);
  }

  &:active {
    background-color: var(--purple-800);
    transform: translateY(0);
  }
`;

export default ExploreButton;
