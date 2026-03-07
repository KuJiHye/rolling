import axios from './axios';

//특정 수신자의 이모지 리액션 목록을 조회합니다.
export const getReactions = async (recipientId) => {
  const response = await axios.get(`recipients/${recipientId}/reactions/`);
  return response.data?.results || [];
};

//특정 수신자에게 이모지 리액션을 추가합니다.
export const postReaction = async (recipientId, emoji) => {
  await axios.post(`recipients/${recipientId}/reactions/`, {
    emoji,
    type: "increase",
  });
};