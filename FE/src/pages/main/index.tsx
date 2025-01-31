import { Col, Row } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RoomDto } from "src/interfaces/Room";
import styled from "styled-components";

import ChatComponent from "../../components/main/chat/ChatComponent";
import InfoComponent from "../../components/main/info/InfoComponent";
import { axiosRequest } from "../../services/AxiosService";
import SocketService from "../../services/SocketService";
import {
  chatListState,
  roomIdState,
  roomListState,
  userIdState,
  userListState,
} from "../../stores/atoms";

const Main: React.FC = () => {
  const userId = useRecoilValue(userIdState);
  const setUserId = useSetRecoilState(userIdState);
  const userList = useRecoilValue(userListState);
  const setUserList = useSetRecoilState(userListState);
  const roomId = useRecoilValue(roomIdState);
  const setRoomId = useSetRecoilState(roomIdState);
  const roomList = useRecoilValue(roomListState);
  const setRoomList = useSetRecoilState(roomListState);
  const chatList = useRecoilValue(chatListState);
  const setChatList = useSetRecoilState(chatListState);

  const [allNotReadCount, setAllNotReadCount] = useState<number>(0);

  const getAllNotReadCount = useCallback((roomList: RoomDto[]) => {
    return roomList.reduce((acc, cur) => acc + (cur.notReadCount || 0), 0);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [roomListResponse, userListResponse] = await Promise.all([
          axiosRequest("get", `/room/list/${userId}`),
          axiosRequest("get", "/user/list"),
        ]);
        setRoomList(roomListResponse.data);
        setUserList(userListResponse.data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    if (userId !== 0) {
      fetchInitialData();
    }
  }, [userId, setRoomList, setUserList]);

  useEffect(() => {
    if (userId !== 0) {
      SocketService.connect(setRoomList, setChatList);
    }
    return () => {
      SocketService.close();
    };
  }, [setChatList, setRoomList, userId]);

  useEffect(() => {
    SocketService.initialize(() => ({ roomId, userId }));
  }, [userId, roomId]);

  useEffect(() => {
    setAllNotReadCount(getAllNotReadCount(roomList));
  }, [roomList, getAllNotReadCount]);

  const infoProps = useMemo(
    () => ({
      userId,
      setUserId,
      userList,
      setUserList,
      setRoomId,
      roomList,
      setRoomList,
      setChatList,
      allNotReadCount,
    }),
    [
      userId,
      setUserId,
      userList,
      setUserList,
      setRoomId,
      roomList,
      setRoomList,
      setChatList,
      allNotReadCount,
    ]
  );

  const chatProps = useMemo(
    () => ({
      userId,
      roomId,
      setRoomId,
      chatList,
      roomList,
      setRoomList,
      setChatList,
      userList,
    }),
    [
      userId,
      roomId,
      setRoomId,
      chatList,
      roomList,
      setRoomList,
      setChatList,
      userList,
    ]
  );

  return (
    <Row>
      <ColWrapper>
        <InfoComponent {...infoProps} />
      </ColWrapper>
      <ColWrapper>
        <ChatComponent {...chatProps} />
      </ColWrapper>
    </Row>
  );
};

const ColWrapper = styled(Col)`
  border: 1px solid gray;
  width: 452px;
  height: 602px;
`;

export default Main;
