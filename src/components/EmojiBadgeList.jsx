//이모지 데이터를 인기순으로 정렬하여 상위 6개를 표시하는 컴포넌트
import React from 'react';

const EmojiBadgeList = ({ emojiData }) => {
  //데이터가 없을 때를 대비, Optional Chaining 및 빈 배열 기본값 설정
  const topEmojis = emojiData
    ?.sort((a, b) => b.count - a.count)
    .slice(0, 6) || []; 

  return (
    <div>
      {topEmojis.map((emoji) => (
        //리액트 리스트 렌더링 시 고유 key 값 부여
        <div key={emoji.id}>
          <span>{emoji.emoji}</span>
          <span>{emoji.count}</span>
        </div>
      ))}
    </div>
  );
};

export default EmojiBadgeList;