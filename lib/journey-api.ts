import axios from "axios";

const api = axios.create({
  baseURL: "https://lehlehka.b.goit.study",
});

export const getPublicWeeks = async () => {
  const { data } = await api.get("/weeks/greeting/public");
  return data;
};
