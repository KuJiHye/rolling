import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://rolling-api.vercel.app/23-5/recipients/",
});

export default axios;
