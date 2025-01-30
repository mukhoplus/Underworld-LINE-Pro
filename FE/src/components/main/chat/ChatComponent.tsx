import { useState, useEffect, useRef } from "react";
import { Input, Button } from "antd";
import SocketService from "../../../services/SocketService";
import { axiosRequest } from "../../../services/AxiosService";
import { isInNotReadMessages } from "../../../utils/MessageUtil";
import ChatBlank from "./ChatBlnak";
import ChatList from "./ChatList";
import { ChatDto } from "../../../interfaces/Chat";
import "./ChatComponent.css";

interface ChatComponentProps {
  userId: number;
  roomId: number;
  setRoomId: (id: number) => void;
  chatList: ChatDto[];
  roomList: any[];
  setRoomList: (list: any[]) => void;
  setChatList: (list: ChatDto[]) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  userId,
  roomId,
  setRoomId,
  chatList,
  roomList,
  setRoomList,
  setChatList,
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const chatListRef = useRef<HTMLDivElement | null>(null);
  let dateOutput: { [key: string]: boolean } = {};

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
        if (isInNotReadMessages(userId, newChatList)) {
          SocketService.read(roomId, userId);
          return;
        }
        setChatList(newChatList);
      })
      .catch(() => {});
  };

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

  useEffect(() => {
    setInputMessage("");
    dateOutput = {}; // eslint-disable-line react-hooks/exhaustive-deps
    handleChatList();

    if (chatListRef.current) {
      const element = document.getElementById("chat-list");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [roomId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (chatListRef.current) {
      const element = document.getElementById("chat-list");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [chatList]);

  return (
    <>
      <div>
        {roomId === 0 ? (
          <ChatBlank />
        ) : (
          <>
            <div className="chat-component">
              <ChatList
                userId={userId}
                chatList={chatList}
                roomId={roomId}
                setRoomId={setRoomId}
                roomList={roomList}
                setRoomList={setRoomList}
                setChatList={setChatList}
                chatListRef={chatListRef}
                dateOutput={dateOutput}
              />
              <div style={{ display: "flex", margin: "1px 0px" }}>
                <Input.TextArea
                  id="chat-input"
                  placeholder=""
                  value={inputMessage}
                  onChange={handleInputChange}
                  style={{ flex: "1", marginRight: "10px" }}
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  onKeyPress={handleEnterKey}
                />
                <Button
                  className="submit-btn"
                  type="primary"
                  onClick={handleSendMessage}
                  disabled={!sendMessageValidation()}
                >
                  전송
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
