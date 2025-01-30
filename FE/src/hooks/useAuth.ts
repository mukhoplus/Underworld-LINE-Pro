import { useRecoilValue, useSetRecoilState } from "recoil";

import { axiosRequest } from "../services/AxiosService";
import { isSessionState, userIdState } from "../stores/atoms";

export const useAuth = () => {
  const setUserId = useSetRecoilState(userIdState);
  const setIsSession = useSetRecoilState(isSessionState);
  const userId = useRecoilValue(userIdState);

  const login = async (id: string, password: string) => {
    const response = await axiosRequest("post", "/user/login", {
      id,
      password,
    });
    if (response.data === "401 UNAUTHORIZED") {
      return "unauthorized";
    }
    if (response.data === "409 CONFLICT") {
      return "conflict";
    }
    await checkSession();
    return "success";
  };

  const checkSession = async () => {
    try {
      const response = await axiosRequest("get", "/user/session");
      const userId = response?.data || 0;
      setUserId(userId);
      setIsSession(true);
      return userId;
    } catch (error) {
      console.log(error);
      setUserId(0);
      setIsSession(false);
      return 0;
    }
  };

  const logout = async () => {
    await axiosRequest("post", "/user/logout");
    setUserId(0);
    setIsSession(false);
  };

  return { login, checkSession, logout, userId };
};
