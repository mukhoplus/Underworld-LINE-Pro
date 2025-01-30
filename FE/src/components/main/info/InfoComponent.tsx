import { useState, useEffect } from "react";
import { Button, Row, Col, Badge } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import UserComponent from "./user/UserComponent";
import RoomComponent from "./room/RoomComponent";
import { axiosRequest } from "../../../services/AxiosService";
import SocketService from "../../../services/SocketService";
import "./InfoComponent.css";

interface InfoComponentProps {
  userId: number;
  setUserId: (id: number) => void;
  userList: any[];
  setUserList: (list: any[]) => void;
  setRoomId: (id: number) => void;
  roomList: any[];
  setRoomList: (list: any[]) => void;
  setChatList: (list: any[]) => void;
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
    <>
      <InfoWrapper>
        <Col style={{ borderRight: "1px solid gainsboro" }}>
          <Row>
            <Button className="btn-icon" onClick={() => setMenu(0)}>
              <UserOutlined
                className="icon"
                style={{ color: menu === 0 ? "#06c755" : "" }}
              />
            </Button>
          </Row>
          <Row>
            <Button className="btn-icon" onClick={() => setMenu(1)}>
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
            </Button>
          </Row>
          <Row>
            <div className="btn-icon-temp" />
          </Row>
          <Row>
            <Button
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
            </Button>
          </Row>
        </Col>
        <ContentCol>
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
        </ContentCol>
      </InfoWrapper>
    </>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const ContentCol = styled(Col)`
  max-width: calc(100% - 50px);
  height: 100%;
  overflow: auto;
`;

export default InfoComponent;
