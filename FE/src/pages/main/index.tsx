import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import SocketService from "../../services/SocketService";
import InfoComponent from "../../components/main/info/InfoComponent";
import ChatComponent from "../../components/main/chat/ChatComponent";
import { BaseURL } from "../../services/HostingService";
import styled from "styled-components";

const getAllNotReadCount = (roomList: any) => {
  return roomList.reduce((acc: any, cur: any) => {
    return acc + cur.notReadCount;
  }, 0);
};

const Main = ({
  userId,
  userList,
  roomList,
  roomId,
  chatList,
  setUserId,
  setUserList,
  setRoomList,
  setRoomId,
  setChatList,
}: any) => {
  const [allNotReadCount, setAllNotReadCount] = useState(0);

  useEffect(() => {
    SocketService.connect(
      `wss://${BaseURL}/api/v2/socket`,
      userId,
      roomId,
      setRoomList,
      setChatList
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAllNotReadCount(getAllNotReadCount(roomList));
  }, [roomList, chatList]);

  return (
    <Row>
      <MainWrapper>
        <InfoComponent
          userId={userId}
          setUserId={setUserId}
          userList={userList}
          setUserList={setUserList}
          setRoomId={setRoomId}
          roomList={roomList}
          setRoomList={setRoomList}
          setChatList={setChatList}
          allNotReadCount={allNotReadCount}
        />
      </MainWrapper>
      <MainWrapper>
        <ChatComponent
          userId={userId}
          roomId={roomId}
          setRoomId={setRoomId}
          chatList={chatList}
          roomList={roomList}
          setRoomList={setRoomList}
          setChatList={setChatList}
        />
      </MainWrapper>
    </Row>
  );
};

const MainWrapper = styled(Col)`
  border: 1px solid gray;
  width: 452px;
  height: 602px;
`;

export default Main;
