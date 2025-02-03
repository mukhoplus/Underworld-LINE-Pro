import {
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import React from "react";
import styled from "styled-components";

import { axiosRequest } from "../../../../services/AxiosService";
import SocketService from "../../../../services/SocketService";

interface NavigationBarProps {
  menu: number;
  setMenu: (menu: number) => void;
  resetStates: () => void;
  allNotReadCount: number;
}

const NavigationBar = React.memo(
  ({ menu, setMenu, resetStates, allNotReadCount }: NavigationBarProps) => {
    return (
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
    );
  }
);

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

export default NavigationBar;
