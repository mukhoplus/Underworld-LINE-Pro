import { axiosRequest } from "./AxiosService";

export async function getSessionUserId(
  setUserId: (userId: number) => void,
  setIsSession: (isSession: boolean) => void
) {
  axiosRequest("get", "/user/session")
    .then((response) => {
      const sessionUserId = Number(response.data);
      setUserId(sessionUserId);
      setIsSession(true);
    })
    .catch(() => {
      setUserId(0);
      setIsSession(false);
    });
}
