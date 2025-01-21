export interface Room {
  roomId: number;
  roomType: string;
  name: string;
  lastMessage: string;
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
}

export interface RoomDto {
  roomId: number;
  userId: number;
  roomName: string;
  lastMessage: string;
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  notReadCount: number;
}

export interface RoomParticipants {
  roomId: number;
  userId: number;
}
