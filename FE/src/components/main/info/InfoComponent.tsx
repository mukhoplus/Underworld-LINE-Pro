import "./InfoComponent.css";

import { useEffect, useState } from "react";
import { ChatDto } from "src/interfaces/Chat";
import { RoomDto } from "src/interfaces/Room";
import { UserListDto } from "src/interfaces/User";
import styled from "styled-components";

import { axiosRequest } from "../../../services/AxiosService";
import NavigationBar from "./navigation/NavigationBar";
import CreateRoomModal from "./room/CreateRoomModal";
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
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

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
        <AddButton onClick={() => setIsCreateRoomModalOpen(true)}>
          <span>+</span>
        </AddButton>
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
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        userList={userList}
        userId={userId}
        onRoomCreated={handleRoomList}
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
  justify-content: space-between;
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

const AddButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
  }

  span {
    line-height: 1;
  }
`;

export default InfoComponent;
