import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ExploreButton = ({ to = "/list", children = "구경해보기" }) => {
  return (
    <StyledButtonLink to={to}>
      {children}
    </StyledButtonLink>
  );
};

const StyledButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 280px; 
  height: 56px;
  padding: 14px 24px;
  box-sizing: border-box;
  
  background-color: var(--purple-600);
  border-radius: 12px;

  font: var(--font-18-bold);
  color: var(--white);
  letter-spacing: -0.01em; 
  text-decoration: none; 
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  @media ${({ theme }) => theme.tablet} {
    width: 100%; 
    max-width: 720px; 
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
    max-width: 320px; 
  }

  &:hover {
    background-color: var(--purple-700);
  }

  &:active {
    background-color: var(--purple-800);
  }
`;

export default ExploreButton;