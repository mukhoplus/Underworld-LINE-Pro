import "./InfoComponent.css";

import { useEffect, useState } from "react";
import { ChatDto } from "src/interfaces/Chat";
import { RoomDto } from "src/interfaces/Room";
import { UserListDto } from "src/interfaces/User";
import styled from "styled-components";

import { axiosRequest } from "../../../services/AxiosService";
import NavigationBar from "./navigation/NavigationBar";
import RoomComponent from "./room/RoomComponent";
import UserComponent from "./user/UserComponent";
interface InfoComponentProps {
  userId: number;
  setUserId: (id: number) => void;
  userList: UserListDto[];
  setUserList: (list: UserListDto[]) => void;
  setRoomId: (id: number) => void;
  roomList: RoomDto[];
  setRoomList: (list: RoomDto[]) => void;
  setChatList: (list: ChatDto[]) => void;
  allNotReadCount: number;
}

const InfoComponent: React.FC<InfoComponentProps> = ({
  userId,
  setUserId,
  userList,
  setUserList,
  setRoomId,
  roomList,
  setRoomList,
  setChatList,
  allNotReadCount,
}) => {
  const [menu, setMenu] = useState<number>(0);

  const handleUserList = async () => {
    axiosRequest("get", "/user/list")
      .then((response) => {
        const data = response.data;
        setUserList(data);
      })
      .catch(() => {
        resetStates();
      });
  };

  const resetStates = () => {
    setUserId(0);
    setUserList([]);
    setRoomId(0);
    setRoomList([]);
    setChatList([]);
  };

  const handleRoomList = async () => {
    axiosRequest("get", `/room/list/${userId}`)
      .then((response) => {
        setRoomList(response.data);
      })
      .catch(() => {
        resetStates();
      });
  };

  useEffect(() => {
    handleUserList();
    handleRoomList();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InfoWrapper>
      <Header>
        <h2>{menu === 0 ? "친구" : "채팅"}</h2>
      </Header>
      <ContentArea>
        {menu === 0 ? (
          <UserComponent
            userId={userId}
            userList={userList}
            setRoomId={setRoomId}
            roomList={roomList}
            setRoomList={setRoomList}
          />
        ) : (
          <RoomComponent setRoomId={setRoomId} roomList={roomList} />
        )}
      </ContentArea>
      <NavigationBar
        menu={menu}
        setMenu={setMenu}
        resetStates={resetStates}
        allNotReadCount={allNotReadCount}
      />
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gainsboro;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export default InfoComponent;
