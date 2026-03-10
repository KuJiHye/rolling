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
