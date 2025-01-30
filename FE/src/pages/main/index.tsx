import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Row, Col } from "antd";
import {
  userIdState,
  userListState,
  roomIdState,
  roomListState,
  chatListState,
} from "../../stores/atoms";
import ChatComponent from "../../components/main/chat/ChatComponent";
import InfoComponent from "../../components/main/info/InfoComponent";
import { axiosRequest } from "../../services/AxiosService";
import { BaseURL } from "../../services/HostingService";
import SocketService from "../../services/SocketService";
import styled from "styled-components";

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

  const getAllNotReadCount = useCallback((roomList: any[]) => {
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
      SocketService.connect(
        `ws://${BaseURL}/api/v2/socket`,
        userId,
        roomId,
        setRoomList,
        setChatList
      );
    }
    return () => {
      SocketService.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    }),
    [userId, roomId, setRoomId, chatList, roomList, setRoomList, setChatList]
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
