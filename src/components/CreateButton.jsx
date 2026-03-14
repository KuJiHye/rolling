import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CreateButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => navigate('/post')}>
      롤링 페이퍼 만들기
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 149px;        
  height: 40px;       
  padding: 8px 16px;    
  gap: 10px;         
  
  background-color: var(--white);
  border: 1px solid var(--gray-300); 
  border-radius: 6px;         

  font: var(--font-16-bold);
  color: var(--gray-900);
  line-height: 26px;
  letter-spacing: -0.01em;
  white-space: nowrap; 
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;   

  &:hover {
    background-color: var(--gray-100);
    border-color: var(--gray-400);
  }

  &:active {
    background-color: var(--gray-200);
  }
`;

export default CreateButton;