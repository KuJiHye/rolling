import { useState } from 'react';
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

  const sortedEmojis = [...emojis].sort((a, b) => b.count - a.count);
  const topThree = sortedEmojis.slice(0, 3);
  const topEight = sortedEmojis.slice(0, 8);

  const handlePickerToggle = () => setIsPickerVisible((prev) => !prev);
  const handleDropdownToggle = () => setIsDropdownVisible((prev) => !prev);

  const handleEmojiSelect = (emojiObject) => {
    handleAddEmoji(emojiObject.emoji);
    setIsPickerVisible(false);
  };

return (
    <StyledEmojiReactionContainer>
      <EmojiBadgeList emojiData={topThree} />

      <StyledAddEmojiWrapper> 
        <StyledMoreButton onClick={handleDropdownToggle} type="button">
          <img src={arrowIcon} alt="더보기" />
        </StyledMoreButton>

        {isDropdownVisible && (
          <StyledDropdownList>
            {topEight.map((emoji) => (
              <StyledDropdownEmoji key={emoji.id}>
                <span>{emoji.emoji}</span>
                <span>{emoji.count}</span>
              </StyledDropdownEmoji>
            ))}
          </StyledDropdownList>
        )}
      </StyledAddEmojiWrapper>

      <StyledAddEmojiWrapper>
        <StyledAddButton onClick={handlePickerToggle}>
          <StyledAddIcon src={addEmoji} alt="추가 아이콘" />
          추가
        </StyledAddButton>
        {isPickerVisible && (
          <StyledPickerContainer>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </StyledPickerContainer>
        )}
      </StyledAddEmojiWrapper>
    </StyledEmojiReactionContainer>
  );
};


const StyledEmojiReactionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; 
  height: 36px;
  padding: 6px;
  
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const StyledDropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 10;
  
  width: 312px; 
  padding: 24px;

  background-color: var(--white);
  border: 1px solid #B6B6B6;
  border-radius: 8px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; 
`;

const StyledDropdownEmoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 6px 12px;
  gap: 2px;
  
  background-color: rgba(0, 0, 0, 0.54);
  border-radius: 32px;
  
  color: var(--white);
  font: var(--font-16-regular);
  letter-spacing: -0.01em;
  white-space: nowrap;
`;

const StyledAddEmojiWrapper = styled.div`
  position: relative;
`;

const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  gap: 4px;
  padding: 6px 16px;

  border: 1px solid var(--gray-300);
  border-radius: 6px;

  background-color: var(--white);
  color: var(--gray-900);
  font: var(--font-16-regular); 
  line-height: 24px;

  &:hover {
    background-color: var(--gray-100);
  }

    &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledAddIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledPickerContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 1000;
`;
export default EmojiReaction;