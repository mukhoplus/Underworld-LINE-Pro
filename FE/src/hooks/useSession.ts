import { useSetRecoilState } from "recoil";

import { axiosRequest } from "../services/AxiosService";
import { userIdState } from "../stores/atoms";

export const useSession = () => {
  const setUserId = useSetRecoilState(userIdState);

  const getSessionUserId = async (
    setIsSession: (isSession: boolean) => void
  ) => {
    try {
      const response = await axiosRequest("get", "/user/session");
      const userId = response?.data || 0;
      setUserId(userId);
      setIsSession(userId !== 0);
      return userId;
    } catch (error) {
      setUserId(0);
      setIsSession(false);
      return 0;
    }
  };

  return { getSessionUserId };
};
