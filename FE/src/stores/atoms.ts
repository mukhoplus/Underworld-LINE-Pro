import { atom } from "recoil";

import { ChatDto } from "../interfaces/Chat";
import { RoomDto } from "../interfaces/Room";
import { UserListDto } from "../interfaces/User";

export const isSessionState = atom<boolean>({
  key: "isSessionState",
  default: false,
});

export const userIdState = atom<number>({
  key: "userIdState",
  default: 0,
});

export const userListState = atom<UserListDto[]>({
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
