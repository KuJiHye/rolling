import axios from "axios";

const instance = axios.create({
  baseURL: "https://rolling-api.vercel.app/23-5",
  timeout: 5000,
});

//롤링페이퍼 List 불러오기
export const getRecipients = async ({ limit = 4, offset = 0, sort = "" }) => {
  const response = await instance.get("/recipients/", {
    params: {
      limit,
      offset,
      sort,
    },
  });
  return response.data;
};

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

export default axios;
