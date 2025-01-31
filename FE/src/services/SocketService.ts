import { ChatDto } from "src/interfaces/Chat";
import { RoomDto } from "src/interfaces/Room";
import { SOCKET_URL } from "src/services/HostingService";

import { isInNotReadMessages } from "../utils/MessageUtil";

interface SendChatDto {
  roomId: number;
  sendUserId: number;
  message: string;
}

interface SocketSendDto {
  type: "chat" | "read";
  data: SendChatDto;
}

interface ChatResponseDto {
  roomId: number;
  chatList: ChatDto[];
}

interface WebSocketData {
  roomList: RoomDto[];
  chatResponseDto: ChatResponseDto;
}

const SocketService = {
  socket: null as WebSocket | null,
  getState: null as (() => { roomId: number; userId: number }) | null,

  initialize: (getState: () => { roomId: number; userId: number }) => {
    SocketService.getState = getState;
  },

  connect: (
    setRoomList: (roomList: RoomDto[]) => void,
    setChatList: (chatList: ChatDto[]) => void
  ) => {
    SocketService.socket = new WebSocket(SOCKET_URL);

    SocketService.socket.onopen = () => {};

    SocketService.socket.onmessage = (event: MessageEvent) => {
      if (!SocketService.getState) return;

      const { userId, roomId } = SocketService.getState();
      const data = JSON.parse(event.data) as WebSocketData;
      const { roomList, chatResponseDto } = data;
      const { roomId: responseRoomId, chatList } = chatResponseDto;

      setRoomList(roomList);

      if (roomId === 0) return;
      if (roomId !== responseRoomId) return;

      if (isInNotReadMessages(roomList)) {
        SocketService.read(roomId, userId);
        return;
      }

      setChatList(chatList);
    };

    SocketService.socket.onclose = () => {};
  },

  send: (roomId: number, sendUserId: number, message: string) => {
    if (!SocketService.socket || /^\s*$/.test(message)) return;

    const sendChatDto: SendChatDto = {
      roomId,
      sendUserId,
      message,
    };

    const socketSendDto: SocketSendDto = {
      type: "chat",
      data: sendChatDto,
    };

    try {
      SocketService.socket.send(JSON.stringify(socketSendDto));
    } catch (error) {}
  },

  read: (roomId: number, readUserId: number) => {
    if (!SocketService.socket) return;

    const sendChatDto: SendChatDto = {
      roomId,
      sendUserId: readUserId,
      message: "",
    };

    const socketSendDto: SocketSendDto = {
      type: "read",
      data: sendChatDto,
    };

    try {
      SocketService.socket.send(JSON.stringify(socketSendDto));
    } catch (error) {}
  },

  close: () => {
    if (SocketService.socket) {
      SocketService.socket.close();
    }
  },
};

export default SocketService;
