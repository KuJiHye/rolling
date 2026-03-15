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

// 롤링페이퍼 상세페이지 데이터 불러오기
export const getDetailRecipients = async (id) => {
  const response = await instance.get(`/recipients/${id}/`);
  return response.data;
};

// 롤링페이퍼 페이지 삭제
export const deleteRecipients = async (id) => {
  const response = await instance.delete(`/recipients/${id}/`);
  return response.data;
};

// 롤링페이퍼 상세페이지 메세지 데이터 불러오기
export const getDetailMessages = async (id, { limit, offset }) => {
  const response = await instance.get(`/recipients/${id}/messages/`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

// 롤링페이퍼 상세페이지 메세지 삭제
export const deleteMessages = async (id) => {
  const response = await instance.delete(`messages/${id}/`);
  return response.data;
};
