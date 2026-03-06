//롤링페이퍼 상세 정보와 이모지 반응을 조회 및 추가하는 페이지 컴포넌트
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import EmojiBadgeList from '../components/EmojiBadgeList';
import EmojiPicker from 'emoji-picker-react';

const RollingPaperDetail = () => {
  const [emojis, setEmojis] = useState([]);
  const [isShowPicker, setIsShowPicker] = useState(false);
  const { id } = useParams(); 
  const recipientId = id;

  //서버로부터 이모지 반응 데이터를 가져오는 함수
  const fetchEmojiData = async () => {
    try {
      const response = await axios.get(`/${recipientId}/reactions/`);
      setEmojis(response.data?.results || []);
    } catch (error) {
      console.error('이모지 데이터를 불러오는데 실패:', error);
    }
  };

  // 이모지 선택 시 서버에 POST 요청을 보내는 핸들러 함수
  const handleEmojiClick = async (emojiObject) => {
    const selectedEmoji = emojiObject.emoji;

    try {
      await axios.post(`/${recipientId}/reactions/`, {
        emoji: selectedEmoji,
        type: "increase"
      });

      setIsShowPicker(false);
      fetchEmojiData(); 
    } catch (error) {
      console.error('이모지 전송 실패:', error);
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
      <div>
        <EmojiBadgeList emojiData={emojis} />

        <div style={{ position: 'relative' }}>
          <button onClick={handlePickerToggle}>
            추가 +
          </button>

          {isShowPicker && (
            <div>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RollingPaperDetail;