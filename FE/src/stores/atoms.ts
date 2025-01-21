import { atom, selector } from "recoil";
import { axiosRequest } from "../services/AxiosService";

export interface User {
  id: number;
  name: string;
}

export interface Room {
  roomId: number;
  roomType: "ONE_TO_ONE" | "GROUP";
  name: string;
  lastMessage: string;
  updatedAt: string;
}

export interface Chat {
  chatId: number;
  roomId: number;
  sendUserId: number;
  message: string;
  sendAt: string;
}

export const userIdState = atom<number>({
  key: "userIdState",
  default: 0,
});

export const userListState = atom<User[]>({
  key: "userListState",
  default: [],
});

export const roomListState = atom<Room[]>({
  key: "roomListState",
  default: [],
});

export const roomIdState = atom<number>({
  key: "roomIdState",
  default: 0,
});

export const chatListState = atom<Chat[]>({
  key: "chatListState",
  default: [],
});

export const isSessionState = atom<boolean>({
  key: "isSessionState",
  default: false,
});

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

export const getSessionUserId = async (
  setUserId: (id: number) => void,
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
