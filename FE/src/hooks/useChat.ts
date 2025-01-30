import { useRecoilValue, useSetRecoilState } from "recoil";

import { axiosRequest } from "../services/AxiosService";
import { chatListState, roomIdState, userIdState } from "../stores/atoms";

export const useChat = () => {
  const setChatList = useSetRecoilState(chatListState);
  const roomId = useRecoilValue(roomIdState);
  const userId = useRecoilValue(userIdState);

  const fetchChatList = async () => {
    if (roomId === 0) return;
    const response = await axiosRequest("get", `/chat/${roomId}`);
    setChatList(response.data);
  };

  const clearChat = () => {
    setChatList([]);
  };

  return { fetchChatList, clearChat };
};
