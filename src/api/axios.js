import axios from "axios";

const instance = axios.create({
  baseURL: "https://rolling-api.vercel.app",
  timeout: 5000,
});

//롤링페이퍼 List 불러오기
export const getRecipients = async ({ limit = 4, offset = 0, sort = "" }) => {
  const response = await instance.get("/23-5/recipients/", {
    params: {
      limit,
      offset,
      sort,
    },
  });
  return response.data;
};

// 롤링페이퍼 상세페이지 데이터 불러오기
export const getDetailRecipients = async (id) => {
  const response = await instance.get(`/23-5/recipients/${id}/`);
  return response.data;
};

// 롤링페이퍼 페이지 삭제
export const deleteRecipients = async (id) => {
  const response = await instance.delete(`/23-5/recipients/${id}/`);
  return response.data;
};

// 롤링페이퍼 상세페이지 메세지 데이터 불러오기
export const getDetailMessages = async (id, { limit, offset }) => {
  const response = await instance.get(`/23-5/recipients/${id}/messages/`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

// 롤링페이퍼 상세페이지 메세지 삭제
export const deleteMessages = async (id) => {
  const response = await instance.delete(`/23-5/messages/${id}/`);
  return response.data;
};

//특정 수신자의 이모지 리액션 목록을 조회합니다.
export const getReactions = async (recipientId) => {
  const response = await instance.get(`/23-5/recipients/${recipientId}/reactions/`);
  return response.data?.results || [];
};

//특정 수신자에게 이모지 리액션을 추가합니다.
export const postReaction = async (recipientId, emoji) => {
  await instance.post(`/23-5/recipients/${recipientId}/reactions/`, {
    emoji,
    type: "increase",
  });
};

//배경 이미지 불러오기 
export const loadBackgroundImg = async () => {
  const response = await instance.get('/background-images/')
  return response.data.imageUrls
}

//생성된 롤링페이퍼 제출하기 

export const submitNewRollingPaper = async (postData) =>{
  const response = await instance.post(`/23-5/recipients/`, postData);
  return response;
}

export default instance;
