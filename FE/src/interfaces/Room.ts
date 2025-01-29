export interface RoomParticipants {
  roomId: number;
  userId: number;
}

export enum RoomType {
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
  userId: number;
  roomName: string;
  lastMessage: string;
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  notReadCount: number;
}

export interface CreateRoomDto {
  roomType: RoomType;
  name?: string;
  participants: number[]; // userId array
}
