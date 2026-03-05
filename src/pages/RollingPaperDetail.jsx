//롤링페이퍼 상세 정보와 이모지 반응을 조회 및 추가하는 페이지 컴포넌트
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmojiBadgeList from '../components/EmojiBadgeList';
import EmojiPicker from 'emoji-picker-react';

const RollingPaperDetail = () => {
  const [emojis, setEmojis] = useState([]);
  const [isShowPicker, setIsShowPicker] = useState(false); 
  const recipientId = 2; 

  //서버로부터 이모지 반응 데이터를 가져오는 함수
  const fetchEmojiData = async () => {
    try {
      const response = await axios.get(`https://rolling-api.vercel.app/23-5/recipients/${recipientId}/reactions/`);
      setEmojis(response.data?.results || []); 
    } catch (error) {
      console.error('이모지 데이터를 불러오는데 실패했습니다:', error);
    }
  };

  // 이모지 선택 시 서버에 POST 요청을 보내는 핸들러 함수
  const handleEmojiClick = async (emojiObject) => {
    const selectedEmoji = emojiObject.emoji;

    try {
      await axios.post(`https://rolling-api.vercel.app/23-5/recipients/${recipientId}/reactions/`, {
        emoji: selectedEmoji,
        type: "increase"
      });

      setIsShowPicker(false);
      fetchEmojiData(); 
    } catch (error) {

    }
  };

  // 추가 버튼 클릭 시 피커 표시 여부를 토글하는 핸들러 함수
  const handlePickerToggle = () => {
    setIsShowPicker((prev) => !prev);
  };

  useEffect(() => {
    fetchEmojiData();
  }, [recipientId]);

  return (
    <div>
      <h2>롤링 페이퍼 상세</h2>
      
      <div>
        <EmojiBadgeList emojiData={emojis} />

        <div style={{ position: 'relative' }}>
          <button onClick={handlePickerToggle}>
            추가 +
          </button>

          {isShowPicker && (
            <div style={{ position: 'absolute', top: '40px', right: '0', zIndex: 100 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RollingPaperDetail;