import { isInNotReadMessages } from "../utils/MessageUtil";

interface SendChatDto {
  roomId: number;
  sendUserId: number;
  message: string;
}

interface SocketSendDto {
  type: string;
  data: SendChatDto;
}

interface ChatResponseDto {
  roomId: number;
  chatList: any[];
}

interface WebSocketData {
  roomList: any[];
  chatResponseDto: ChatResponseDto;
}

const SocketService = {
  socket: null as WebSocket | null,

  connect: (
    url: string,
    userId: number,
    roomId: number,
    setRoomList: (roomList: any[]) => void,
    setChatList: (chatList: any[]) => void
  ) => {
    SocketService.socket = new WebSocket(url);

    SocketService.socket.onopen = () => {};

    SocketService.socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as WebSocketData;
      const { roomList, chatResponseDto } = data;
      const { roomId: responseRoomId, chatList } = chatResponseDto;

      setRoomList(roomList);

      if (roomId === 0) return;
      if (roomId !== responseRoomId) return;

      if (isInNotReadMessages(userId, chatList)) {
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
