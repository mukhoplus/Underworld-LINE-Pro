import "./ChatComponent.css";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { RoomDto, RoomParticipantDto, RoomType } from "src/interfaces/Room";
import styled from "styled-components";

import { ChatDto } from "../../../interfaces/Chat";
import { UserListDto } from "../../../interfaces/User";
import { axiosRequest } from "../../../services/AxiosService";
import SocketService from "../../../services/SocketService";
import { LongStringUtil } from "../../../utils/LongStringUtil";
import { isInNotReadMessages } from "../../../utils/MessageUtil";
import ChatList from "./list/ChatList";
import ParticipantsModal from "./modal/ParticipantsModal";

interface ChatComponentProps {
  userId: number;
  roomId: number;
  setRoomId: (id: number) => void;
  chatList: ChatDto[];
  roomList: RoomDto[];
  setChatList: (list: ChatDto[]) => void;
  userList: UserListDto[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  userId,
  roomId,
  setRoomId,
  chatList,
  roomList,
  setChatList,
  userList,
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [prevHeight, setPrevHeight] = useState<number>(0);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [participants, setParticipants] = useState<RoomParticipantDto[]>([]);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);
  let dateOutput: { [key: string]: boolean } = {};

  const currentRoom = roomList.find((room) => room.roomId === roomId);

  const getRoomNameByRoomId = useCallback((roomList: any, roomId: number) => {
    const getRoomNameInRoomList = (roomList: any, roomId: number) => {
      const room = roomList.find((room: any) => room.roomId === roomId);
      return room?.roomName || "";
    };

    if (roomId === 0) return "";

    return getRoomNameInRoomList(roomList, roomId);
  }, []);

  const handleBack = () => {
    setRoomId(0);
    setChatList([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const sendMessageValidation = () => {
    return !/^\s*$/.test(inputMessage);
  };

  const handleSendMessage = () => {
    if (sendMessageValidation()) {
      const trimMessage = inputMessage.trim();

      SocketService.send(roomId, userId, trimMessage);
      setInputMessage("");
    }
  };

  const handleChatList = async () => {
    if (roomId === 0) return;

    await axiosRequest("get", `/chat/${roomId}`)
      .then((response) => {
        const newChatList: ChatDto[] = response.data;

        if (isInNotReadMessages(roomList)) {
          SocketService.read(roomId, userId);
          return;
        }

        setChatList(newChatList);
      })
      .catch(() => {});
  };

  const fetchParticipants = useCallback(async () => {
    try {
      const response = await axiosRequest(
        "get",
        `/room/${roomId}/participants/${userId}`
      );
      setParticipants(response.data);
    } catch (error) {}
  }, [roomId, userId]);

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setInputMessage((prevMessage) => prevMessage + "\n");
      } else {
        handleSendMessage();
      }
      e.preventDefault();
    }
  };

  const scrollToBottom = useCallback(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, []);

  // ResizeObserver
  useEffect(() => {
    if (!chatInputRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === chatInputRef.current) {
          const currentHeight = entry.contentRect.height;

          if (prevHeight !== 0 && chatListRef.current) {
            const heightDiff = currentHeight - prevHeight;

            const isScrollAtBottom =
              chatListRef.current.scrollHeight -
                chatListRef.current.scrollTop <=
              chatListRef.current.clientHeight + 1; // 1px 오차 허용

            if (isScrollAtBottom) {
              // 스크롤이 맨 아래일 때는 항상 맨 아래로 스크롤
              scrollToBottom();
            } else {
              // 높이 변화에 따른 스크롤 조정
              if (chatListRef.current) {
                if (heightDiff > 0) {
                  // 높이가 증가할 때 (줄이 늘어날 때)
                  chatListRef.current.scrollTop += heightDiff;
                } else if (heightDiff < 0) {
                  // 높이가 감소할 때 (줄이 줄어들 때)
                  chatListRef.current.scrollTop += heightDiff;
                }
              }
            }
          }

          setPrevHeight(currentHeight);
        }
      }
    });

    resizeObserver.observe(chatInputRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [prevHeight, scrollToBottom]);

  useEffect(() => {
    setInputMessage("");
    dateOutput = {}; // eslint-disable-line react-hooks/exhaustive-deps
    handleChatList();

    scrollToBottom();
  }, [userId, roomId, scrollToBottom]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollToBottom();
  }, [chatList, scrollToBottom]);

  useEffect(() => {
    if (isParticipantsModalOpen) {
      fetchParticipants();
    }
  }, [isParticipantsModalOpen, fetchParticipants]);

  return (
    <ChatWrapper>
      <ChatHeader>
        <ArrowLeftOutlined
          className="icon"
          style={{
            paddingLeft: "10px",
          }}
          onClick={handleBack}
        />
        <RoomInfo>
          <span className="room-name">
            {LongStringUtil(getRoomNameByRoomId(roomList, roomId), 20)}
          </span>
          {currentRoom?.roomType === RoomType.GROUP && (
            <ParticipantCount onClick={() => setIsParticipantsModalOpen(true)}>
              {currentRoom.participantCount}
            </ParticipantCount>
          )}
        </RoomInfo>
      </ChatHeader>
      <ChatContent ref={chatListRef}>
        <ChatList
          userId={userId}
          chatList={chatList}
          chatListRef={chatListRef}
          dateOutput={dateOutput}
          userList={userList}
        />
      </ChatContent>
      <ChatInput ref={chatInputRef}>
        <Input.TextArea
          id="chat-input"
          placeholder=""
          value={inputMessage}
          onChange={handleInputChange}
          style={{
            flex: "1",
            marginRight: "10px",
            padding: "8px 12px",
            minHeight: "40px",
            fontSize: "18px",
          }}
          autoSize={{ minRows: 1, maxRows: 4 }}
          onKeyPress={handleEnterKey}
        />
        <Button
          className="submit-btn"
          type="primary"
          onClick={handleSendMessage}
          disabled={!sendMessageValidation()}
          style={{
            width: "65px",
            height: "45.24px",
          }}
        >
          전송
        </Button>
      </ChatInput>
      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onClose={() => setIsParticipantsModalOpen(false)}
        participants={participants}
      />
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ChatHeader = styled.div`
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid gainsboro;
`;

const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatInput = styled.div`
  padding: 15px;
  display: flex;
  gap: 10px;
  min-height: 40px;
  border-top: 1px solid gainsboro;
  align-items: end;
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ParticipantCount = styled.span`
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 4px;
  border-radius: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default ChatComponent;
