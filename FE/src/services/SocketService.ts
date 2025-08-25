import {
  ChatDto,
  ChatResponseDto,
  SendChatDto,
  SocketSendDto,
} from "../interfaces/Chat";
import { RoomDto } from "../interfaces/Room";
import { UserListDto } from "../interfaces/User";
import { SOCKET_URL } from "../services/HostingService";
import { isInNotReadMessages } from "../utils/MessageUtil";
import { showNotification } from "../utils/NotificationUtil";

interface WebSocketData {
  roomList: RoomDto[];
  chatResponseDto: ChatResponseDto;
}

const SocketService = {
  socket: null as WebSocket | null,
  getState: null as
    | (() => { roomId: number; userId: number; userList: UserListDto[] })
    | null,

  initialize: (
    getState: () => { roomId: number; userId: number; userList: UserListDto[] }
  ) => {
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

      const { userId, roomId, userList } = SocketService.getState();
      const data = JSON.parse(event.data) as WebSocketData;
      const { roomList, chatResponseDto } = data;
      const { roomId: responseRoomId, chatList } = chatResponseDto;

      setRoomList(roomList);

      // 새 메시지 알림 로직 개선
      const getUserName = (sendUserId: number) => {
        const user = userList.find(
          (user: UserListDto) => user.userId === sendUserId
        );
        return user?.name || "";
      };

      // 알림 표시 조건:
      // 1. 메시지가 있고
      // 2. 현재 채팅방 목록 화면에 있거나 (roomId === 0) 다른 방의 메시지이고
      // 3. 본인이 보낸 메시지가 아니고
      // 4. 해당 방에 읽지 않은 메시지가 있을 때
      if (chatList.length > 0) {
        const lastChat = chatList[chatList.length - 1];
        const room = roomList.find((room) => room.roomId === responseRoomId);

        const shouldShowNotification =
          lastChat &&
          room &&
          lastChat.sendUserId !== userId &&
          room.notReadCount > 0 &&
          (roomId === 0 || responseRoomId !== roomId); // 메인 화면이거나 다른 방의 메시지

        if (shouldShowNotification) {
          showNotification(
            room.roomName,
            `${getUserName(lastChat.sendUserId)}: ${lastChat.message}`
          );
        }
      }

      if (roomId === 0) return;
      if (roomId !== responseRoomId) return;

      setChatList(chatList);

      if (isInNotReadMessages(roomList)) {
        SocketService.read(roomId, userId);
      }
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
