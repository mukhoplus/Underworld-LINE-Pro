import { useState, useEffect } from "react";
import { Button, Row, Col, Badge } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UserComponent from "./UserComponent";
import RoomComponent from "./RoomComponent";
import { axiosRequest } from "../../../services/AxiosService";
import SocketService from "../../../services/SocketService";
import "./index.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userIdState,
  userListState,
  roomIdState,
  roomListState,
  chatListState,
} from "../../../stores/atoms";

const InfoComponent: React.FC = () => {
  const userId = useRecoilValue(userIdState);
  const setUserId = useSetRecoilState(userIdState);
  const userList = useRecoilValue(userListState);
  const setUserList = useSetRecoilState(userListState);
  const setRoomId = useSetRecoilState(roomIdState);
  const roomList = useRecoilValue(roomListState);
  const setRoomList = useSetRecoilState(roomListState);
  const setChatList = useSetRecoilState(chatListState);
  const [menu, setMenu] = useState<number>(0);
  const [allNotReadCount, setAllNotReadCount] = useState<number>(0);
  const chatList = useRecoilValue(chatListState);

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

  const getAllNotReadCount = (roomList: any[]) => {
    return roomList.reduce((acc, cur) => {
      return acc + (cur.notReadCount || 0);
    }, 0);
  };

  useEffect(() => {
    handleUserList();
    handleRoomList();
    setAllNotReadCount(getAllNotReadCount(roomList));
  }, [userId, roomList, chatList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Row>
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
        <Col style={{ width: "389px" }}>
          {menu === 0 ? (
            <UserComponent
              userId={userId}
              userList={userList}
              setRoomId={setRoomId}
            />
          ) : (
            <RoomComponent
              userId={userId}
              setRoomId={setRoomId}
              roomList={roomList}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default InfoComponent;
