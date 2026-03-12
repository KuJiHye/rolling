import { useState } from 'react';
import EmojiBadgeList from './EmojiBadgeList';
import EmojiPicker from 'emoji-picker-react';
import { useEmojiReaction } from '../hooks/useEmojiReaction';
import arrowIcon from '../assets/Arrow_down.svg';

const EmojiReaction = ({ recipientId }) => {
  const { emojis, handleAddEmoji } = useEmojiReaction(recipientId);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const sortedEmojis = [...emojis].sort((a, b) => b.count - a.count);

  const topThree = sortedEmojis.slice(0, 3);
  const topEight = sortedEmojis.slice(0, 8);

  const handlePickerToggle = () => setIsPickerVisible(!isPickerVisible);
  const handleDropdownToggle = () => setIsDropdownVisible(!isDropdownVisible);

  const handleEmojiSelect = (emojiObject) => {
    handleAddEmoji(emojiObject.emoji);
    setIsPickerVisible(false);
  };

  return (
    <div style={{ 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px' }}>

      <EmojiBadgeList emojiData={topThree} />

      <button onClick={handleDropdownToggle} type="button">
        <img src={arrowIcon} alt="더보기" />
      </button>

      {isDropdownVisible && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          zIndex: 10 }}>

          {topEight.map((emoji) => (
            <div key={emoji.id}>
              {emoji.emoji} {emoji.count}
            </div>
          ))}
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <button onClick={handlePickerToggle}>추가 +</button>
        {isPickerVisible && (
          <div style={{ 
            position: 'absolute',
            top: '40px',
            right: 0, 
            zIndex: 1000
          }}>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiReaction;