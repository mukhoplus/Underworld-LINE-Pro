import { atom } from "recoil";
import { User } from "../interfaces/User";
import { Room } from "../interfaces/Room";
import { Chat } from "../interfaces/Chat";

// 사용자 관련 상태
export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const userIdState = atom<number>({
  key: "userIdState",
  default: 0,
});

export const isSessionState = atom<boolean>({
  key: "isSessionState",
  default: false,
});

// 채팅방 관련 상태
export const roomState = atom<Room | null>({
  key: "roomState",
  default: null,
});

export const roomIdState = atom<number>({
  key: "roomIdState",
  default: 0,
});

export const roomListState = atom<Room[]>({
  key: "roomListState",
  default: [],
});

// 채팅 관련 상태
export const chatListState = atom<Chat[]>({
  key: "chatListState",
  default: [],
});

export const userListState = atom<User[]>({
  key: "userListState",
  default: [],
});
