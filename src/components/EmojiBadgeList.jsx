import React from 'react';

const EmojiBadgeList = ({ emojiData }) => {
  const topEmojis = emojiData
    .sort((a, b) => b.count - a.count) 
    .slice(0, 6); 

  return (
    <div>
      {topEmojis.map((emoji) => (
        <div>
          <span>{emoji.emoji}</span>
          <span>{emoji.count}</span>
        </div>
      ))}
    </div>
  );
};

export default EmojiBadgeList;