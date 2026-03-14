import { useState } from 'react';
import styled from 'styled-components';
import KakaoShareButton from './KakaoShareButton';
import UrlShareButton from './UrlShareButton';
import ToastBox from './ToastBox'; 
import greenCheck from '../assets/greenCheck.svg';
import shareIcon from '../assets/share.svg';

const ShareDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopySuccess = () => {
    setShowToast(true);
  };

  return (
    <StyledShareContainer>
      <StyledShareButton onClick={() => setIsOpen(!isOpen)} type="button">
        <img src={shareIcon} alt="공유하기" />
      </StyledShareButton>

      {isOpen && (
        <StyledDropdownMenu>
          <StyledDropdownItem>
            <KakaoShareButton onClose={() => setIsOpen(false)} />
          </StyledDropdownItem>
          
          <StyledDropdownItem>
            <UrlShareButton 
              onCopySuccess={handleCopySuccess} 
              onClose={() => setIsOpen(false)} 
            />
          </StyledDropdownItem>
        </StyledDropdownMenu>
      )}

      {showToast && (
        <ToastBox 
          toastMessage={
            <StyledToastContent>
              <img src={greenCheck} alt="" />
              <span>URL이 복사되었습니다.</span>
            </StyledToastContent>
          } 
          setShowToastMessage={setShowToast} 
        />
      )}
    </StyledShareContainer>
  );
};

export default ShareDropdown;


/* ==================== styled ==================== */

const StyledShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 36px;
  padding: 6px 16px;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: var(--gray-100);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const StyledDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px); 
  right: 0;
  z-index: 20;
  
  width: fit-content;  
  height: fit-content; 
  min-width: 140px;
 
  padding: 10px 1px; 

  background-color: var(--white);
  border: 1px solid var(--gray-300); 
  border-radius: 8px;             
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media ${({ theme }) => theme.mobile} {
    right: 0;
  }
`;

const StyledDropdownItem = styled.div`
  width: 100%; 
  
  button {
    width: 138px;
    height: fit-content; 
    
    padding: 12px 16px; 
    gap: 10px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    background: none;
    border: none;
    cursor: pointer;
    
    font: var(--font-16-regular);
    color: var(--gray-900);
    line-height: 26px;
    
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--gray-100);
    }
  }
`;