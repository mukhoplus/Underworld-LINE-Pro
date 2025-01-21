import { selector } from "recoil";
import { axiosRequest } from "../services/AxiosService";

export const sessionUserIdSelector = selector({
  key: "sessionUserIdSelector",
  get: async () => {
    try {
      const response = await axiosRequest("get", "/user/session");
      return response?.data || 0;
    } catch (error) {
      return 0;
    }
  },
});
