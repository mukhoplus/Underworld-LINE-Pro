import { useCallback } from "react";
import { Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getChatDate, getChatTime } from "../../../../utils/DateTimeUtil";
import { LongStringUtil } from "../../../../utils/LongStringUtil";
import { ChatDto } from "../../../../interfaces/Chat";

interface ChatListProps {
  userId: number;
  chatList: ChatDto[];
  roomId: number;
  setRoomId: (roomId: number) => void;
  roomList: any[];
  setChatList: (chatList: ChatDto[]) => void;
  chatListRef: React.RefObject<HTMLDivElement | null>;
  dateOutput: { [key: string]: boolean };
}

const ChatList: React.FC<ChatListProps> = ({
  userId,
  chatList,
  roomId,
  setRoomId,
  roomList,
  setChatList,
  chatListRef,
  dateOutput,
}) => {
  const getRoomNameByRoomId = useCallback((roomList: any, roomId: number) => {
    const getRoomNameInRoomList = (roomList: any, roomId: number) => {
      const room = roomList.find((room: any) => room.roomId === roomId);
      return room?.roomName || "";
    };

    if (roomId === 0) return "";

    return getRoomNameInRoomList(roomList, roomId);
  }, []);

  const isChatDateInDateOutput = (date: any) => {
    return dateOutput.hasOwnProperty(getChatDate(date));
  };

  const handleChatDate = (date: any) => {
    const chatDate = getChatDate(date);
    dateOutput[chatDate] = true;
    return chatDate;
  };

  const handleBack = () => {
    setRoomId(0);
    setChatList([]);
  };

  return (
    <>
      <div className="info-bar">
        <ArrowLeftOutlined
          className="icon"
          style={{
            paddingLeft: "10px",
          }}
          onClick={handleBack}
        />
        <span className="room-name">
          {LongStringUtil(getRoomNameByRoomId(roomList, roomId), 20)}
        </span>
      </div>
      <div id="chat-list" ref={chatListRef} className="custom-scroll chat-list">
        {chatList.map((chat: ChatDto, index: number) => (
          <div className="chat-line" key={`chat-${index}`}>
            {!isChatDateInDateOutput(chat.sendAt) && (
              <div className="date-line" key={`date-${index}`}>
                <span className="chat-date">{handleChatDate(chat.sendAt)}</span>
              </div>
            )}
            <div
              id={`line-${index}`}
              key={`line-${index}`}
              style={{
                alignSelf:
                  chat.sendUserId === userId ? "flex-end" : "flex-start",
                maxWidth: "80%",
                display: "inline-flex",
                alignItems: "flex-end",
              }}
            >
              {chat.sendUserId !== userId && (
                <div style={{ paddingBottom: "5px" }}>
                  <Avatar />
                </div>
              )}
              {chat.sendUserId === userId && (
                <p
                  style={{
                    margin: 0,
                    paddingBottom: "5px",
                    textAlign: "right",
                    minWidth: "20%",
                  }}
                >
                  {chat.notRead ? chat.notRead : ""}
                  <br />
                  {getChatTime(chat.sendAt)}
                </p>
              )}
              <div
                id={`message-${index}`}
                key={`message-${index}`}
                style={{
                  alignSelf:
                    chat.sendUserId === userId ? "flex-end" : "flex-start",
                  margin: "5px",
                  padding: "10px",
                  maxWidth: chat.sendUserId === userId ? "71%" : "65%",
                  background:
                    chat.sendUserId === userId ? "#06c755" : "#e0e0e0",
                  color: chat.sendUserId === userId ? "white" : "black",
                  borderRadius: "8px",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                }}
              >
                {chat.message}
              </div>
              {chat.sendUserId !== userId && (
                <p
                  style={{
                    margin: 0,
                    paddingBottom: "5px",
                    textAlign: "left",
                    minWidth: "20%",
                  }}
                >
                  {chat.notRead ? chat.notRead : ""}
                  <br />
                  {getChatTime(chat.sendAt)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatList;
