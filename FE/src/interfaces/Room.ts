export interface RoomParticipants {
  roomId: number;
  userId: number;
  lastReadChatId: number;
}

export enum RoomType {
  ME = "ME",
  ONE_TO_ONE = "ONE_TO_ONE",
  GROUP = "GROUP",
}

export interface Room {
  roomId: number;
  roomType: RoomType;
  name: string;
  lastMessage: string;
  updatedAt: string; // ISO 8601 format: "yyyy-MM-dd'T'HH:mm:ss"
}

export interface RoomDto {
  roomId: number;
  roomType: RoomType;
  roomName: string;
  lastMessage: string;
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  lastReadChatId: number;
  notReadCount: number;
  participantCount: number; // 참여자 수
}

export interface CreateRoomDto {
  roomName?: string;
  participants: number[]; // userId array
}

export interface RoomParticipantDto {
  name: string;
}
