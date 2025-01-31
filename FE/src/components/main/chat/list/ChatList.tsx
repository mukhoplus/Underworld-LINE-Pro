import { ArrowLeftOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useCallback } from "react";

import { ChatDto } from "../../../../interfaces/Chat";
import { UserListDto } from "../../../../interfaces/User";
import { getChatDate, getChatTime } from "../../../../utils/DateTimeUtil";
import { LongStringUtil } from "../../../../utils/LongStringUtil";

interface ChatListProps {
  userId: number;
  chatList: ChatDto[];
  roomId: number;
  setRoomId: (roomId: number) => void;
  roomList: any[];
  setChatList: (chatList: ChatDto[]) => void;
  chatListRef: React.RefObject<HTMLDivElement | null>;
  dateOutput: { [key: string]: boolean };
  userList: UserListDto[];
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
  userList,
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

  const getUserName = useCallback(
    (sendUserId: number) => {
      const user = userList.find((user) => user.userId === sendUserId);
      return user?.name || "";
    },
    [userList]
  );

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
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              {chat.sendUserId !== userId && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "5px",
                  }}
                >
                  <Avatar size={55} style={{ marginRight: "3px" }} />
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
                className="chat-content"
                style={{
                  marginTop: chat.sendUserId === userId ? "0px" : "3px",
                  flex: "1",
                  maxWidth: chat.sendUserId === userId ? "80%" : "65%",
                }}
              >
                {chat.sendUserId !== userId && (
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      paddingLeft: "5px",
                    }}
                  >
                    {getUserName(chat.sendUserId)}
                  </span>
                )}
                <div
                  id={`message-${index}`}
                  key={`message-${index}`}
                  style={{
                    alignSelf:
                      chat.sendUserId === userId ? "flex-end" : "flex-start",
                    margin: "5px",
                    padding: "10px",
                    background:
                      chat.sendUserId === userId ? "#06c755" : "#e0e0e0",
                    color: chat.sendUserId === userId ? "white" : "black",
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {chat.message}
                </div>
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
