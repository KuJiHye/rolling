import { useState, useEffect } from 'react';
import { getReactions, postReaction } from '../api/index';

//이모지 데이터 관리 및 추가 로직을 담당하는 훅
export const useEmojiReaction = (recipientId) => { 
  const [emojis, setEmojis] = useState([]);

  const handleFetchEmoji = async () => {
    const data = await getReactions(recipientId);
    setEmojis(data);
  };

  const handleAddEmoji = async (emoji) => {
    await postReaction(recipientId, emoji);
    handleFetchEmoji();
  };

  useEffect(() => {
    if (recipientId) handleFetchEmoji();
  }, [recipientId]);

  return { emojis, handleAddEmoji };
};