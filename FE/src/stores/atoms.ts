import { atom } from "recoil";
import { User } from "../interfaces/User";
import { RoomDto } from "../interfaces/Room";
import { ChatDto } from "../interfaces/Chat";

export const isSessionState = atom<boolean>({
  key: "isSessionState",
  default: false,
});

export const userIdState = atom<number>({
  key: "userIdState",
  default: 0,
});

export const userListState = atom<User[]>({
  key: "userListState",
  default: [],
});

export const roomListState = atom<RoomDto[]>({
  key: "roomListState",
  default: [],
});

export const roomIdState = atom<number>({
  key: "roomIdState",
  default: 0,
});

export const chatListState = atom<ChatDto[]>({
  key: "chatListState",
  default: [],
});
