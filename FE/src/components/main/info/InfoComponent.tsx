import "./InfoComponent.css";

import {
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { useEffect, useState } from "react";
import { ChatDto } from "src/interfaces/Chat";
import { RoomDto } from "src/interfaces/Room";
import { UserListDto } from "src/interfaces/User";
import styled from "styled-components";

import { axiosRequest } from "../../../services/AxiosService";
import SocketService from "../../../services/SocketService";
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

  const handleRoomList = async () => {
    axiosRequest("get", `/room/list/${userId}`)
      .then((response) => {
        setRoomList(response.data);
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
      <BottomNav>
        <NavItem className="btn-icon" onClick={() => setMenu(0)}>
          <UserOutlined
            className="icon"
            style={{ color: menu === 0 ? "#06c755" : "" }}
          />
          <span
            className="nav-text"
            style={{ color: menu === 0 ? "#06c755" : "" }}
          >
            친구
          </span>
        </NavItem>
        <NavItem className="btn-icon" onClick={() => setMenu(1)}>
          <Badge
            style={{ fontSize: "10px" }}
            count={allNotReadCount}
            overflowCount={999}
          >
            <MessageOutlined
              className="icon"
              style={{ color: menu === 1 ? "#06c755" : "" }}
            />
          </Badge>
          <span
            className="nav-text"
            style={{ color: menu === 1 ? "#06c755" : "" }}
          >
            채팅
          </span>
        </NavItem>
        <NavItem
          className="btn-icon"
          onClick={() => {
            axiosRequest("post", "/user/logout")
              .then(() => {
                SocketService.close();
              })
              .catch()
              .finally(() => {
                resetStates();
              });
          }}
        >
          <LogoutOutlined className="icon" />
          <span className="nav-text">로그아웃</span>
        </NavItem>
      </BottomNav>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const BottomNav = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid gainsboro;
  background: white;
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex: 1;

  .nav-icon {
    font-size: 24px;
    color: ${(props) => (props.active ? "#06c755" : "inherit")};
    margin-bottom: 4px;
  }

  .nav-text {
    font-size: 12px;
    color: ${(props) => (props.active ? "#06c755" : "#666")};
  }
`;

export default InfoComponent;
