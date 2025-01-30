import { RoomDto } from "src/interfaces/Room";

export const isInNotReadMessages = (newMessages: RoomDto[]) => {
  return newMessages.some((message: RoomDto) => message.notReadCount > 0);
};
