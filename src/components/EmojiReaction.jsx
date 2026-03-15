import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import EmojiBadgeList from './EmojiBadgeList';
import EmojiPicker from 'emoji-picker-react';
import { useEmojiReaction } from '../hooks/useEmojiReaction';
import arrowIcon from '../assets/Arrow_down.svg';
import addEmoji from '../assets/addEmoji.svg';

const EmojiReaction = ({ recipientId }) => {
  const { emojis, handleAddEmoji } = useEmojiReaction(recipientId);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const pickerRef = useRef(null);
  const dropdownRef = useRef(null);

  const sortedEmojis = [...emojis].sort((a, b) => b.count - a.count);
  const topThree = sortedEmojis.slice(0, 3);
  const topEight = sortedEmojis.slice(0, 8);

  const handleEmojiSelect = (emojiObject) => {
    handleAddEmoji(emojiObject.emoji);
    setIsPickerVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPickerVisible && pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerVisible(false);
      }
      if (isDropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPickerVisible, isDropdownVisible]);

  return (
    <StyledContainer>
      {sortedEmojis.length > 0 && (
        <StyledSection ref={dropdownRef}>
          <EmojiBadgeList emojiData={topThree} />
          
          <StyledMoreButton 
            onClick={() => setIsDropdownVisible(prev => !prev)} 
            type="button"
            aria-label="이모지 더보기"
          >
            <img src={arrowIcon} alt="" />
          </StyledMoreButton>

          {isDropdownVisible && (
            <StyledDropdownList $count={topEight.length}>
              {topEight.map((emoji) => (
                <StyledDropdownEmoji key={emoji.id}>
                  <span className="emoji-icon">{emoji.emoji}</span>
                  <span className="emoji-count">{emoji.count}</span>
                </StyledDropdownEmoji>
              ))}
            </StyledDropdownList>
          )}
        </StyledSection>
      )}

      <StyledSection ref={pickerRef}>
        <StyledAddButton 
          onClick={() => setIsPickerVisible(prev => !prev)} 
          type="button"
          aria-label="이모지 추가하기"
        >
          <img src={addEmoji} alt="" />
          <span className="button-text">추가</span>
        </StyledAddButton>

        {isPickerVisible && (
          <StyledPickerContainer>
            <EmojiPicker 
              onEmojiClick={handleEmojiSelect} 
              width="100%" 
              height="393px"
            />
          </StyledPickerContainer>
        )}
      </StyledSection>
    </StyledContainer>
  );
};

/* ==================== Styled Components ==================== */

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${({ theme }) => theme.mobile} {
    gap: 4px;
  }
`;

const StyledSection = styled.div`
  position: relative; 
  display: flex;
  align-items: center;
`;

const StyledMoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 6px;
  img { width: 24px; height: 24px; }
`;

const StyledDropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px); 
  right: 0;
  z-index: 100;
  padding: 24px;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: ${({ $count }) => 
    $count <= 4 ? `repeat(${$count}, auto)` : `repeat(4, auto)`};
  gap: 10px 8px;

  @media ${({ theme }) => theme.mobile} {
    left: 50%;
    transform: translateX(-50%);
    
    width: fit-content; 
    max-width: 320px;
    
    margin-top: -4px;
  }
`;

const StyledDropdownEmoji = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  background-color: rgba(0, 0, 0, 0.54);
  border-radius: 32px;
  color: var(--white);
  
  .emoji-count { font: var(--font-16-regular); }
`;

const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border: 1px solid var(--gray-300);
  border-radius: 6px;
  background-color: var(--white);
  cursor: pointer;

  .button-text {
    @media ${({ theme }) => theme.mobile} { display: none; }
  }
  @media ${({ theme }) => theme.mobile} { padding: 6px; }
`;

const StyledPickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0; 
  z-index: 1000;
  width: 320px;

  @media ${({ theme }) => theme.mobile} {
    position: fixed; 
    top: 162px;
    left: 50%;
    height: auto;
    transform: translateX(-50%);
    
    background-color: var(--white);
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
    
    display: flex;
    justify-content: center;
  }
`;

export default EmojiReaction;