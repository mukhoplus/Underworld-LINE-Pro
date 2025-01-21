import { useSetRecoilState, useRecoilValue } from "recoil";
import { chatListState, roomIdState, userIdState } from "../stores/atoms";
import { axiosRequest } from "../services/AxiosService";

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
