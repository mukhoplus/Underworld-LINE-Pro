import { RoomDto } from "./Room";

export interface Chat {
  chatId: number;
  roomId: number;
  sendUserId: number;
  message: string;
  notRead: boolean;
  sendAt: string; // ISO 8601 형식의 날짜 문자열
}

export interface ChatDto {
  chatId: number;
  sendUserId: number;
  message: string;
  notRead: number;
  sendAt: string; // ISO 8601 형식의 날짜 문자열
}

export interface ChatResponseDto {
  roomId: number;
  chatList: ChatDto[];
}

export interface SendChatDto {
  roomId: number;
  sendUserId: number;
  message: string;
}

export interface SocketResponseDto {
  roomList: RoomDto[];
  chatResponseDto: ChatResponseDto;
}

export interface SocketSendDto {
  type: string;
  data: SendChatDto;
}
