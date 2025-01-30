import React, { useCallback } from "react";
import { Avatar, Badge } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { getRoomDateTime } from "../../../../utils/DateTimeUtil";
import { LongStringUtil } from "../../../../utils/LongStringUtil";
import "./RoomComponent.css";
import "../../chat/ChatComponent.css";
import { RoomDto, RoomType } from "src/interfaces/Room";

interface RoomComponentProps {
  roomList: RoomDto[];
  setRoomId: (id: number) => void;
}

const RoomComponent: React.FC<RoomComponentProps> = React.memo(
  ({ roomList, setRoomId }) => {
    const handleRoomClick = useCallback(
      (roomId: number) => () => setRoomId(roomId),
      [setRoomId]
    );

    return (
      <div className="room-list custom-scroll">
        {roomList.map((room: RoomDto) => (
          <div
            className="room"
            key={room.roomId}
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
            }}
            onClick={handleRoomClick(room.roomId)}
          >
            <div
              className="avarta"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar style={{ margin: "0px 10px 0px 10px" }} />
            </div>
            <div className="info">
              <div className="line">
                <div
                  className="name"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {room.roomType === RoomType.ME ? (
                    <>
                      <Badge
                        count="나"
                        style={{ backgroundColor: "#06c755" }}
                      />
                      <span style={{ margin: "0 4px" }}>
                        {LongStringUtil(room.roomName, 15)}
                      </span>
                    </>
                  ) : room.roomType === RoomType.GROUP ? (
                    <>
                      <Badge
                        count={<TeamOutlined style={{ color: "#fff" }} />}
                        style={{
                          backgroundColor: "#1890ff",
                          marginRight: "4px",
                        }}
                      />
                      <span>{LongStringUtil(room.roomName, 15)}</span>
                    </>
                  ) : (
                    <span>{LongStringUtil(room.roomName, 15)}</span>
                  )}
                </div>
                <div className="update">{getRoomDateTime(room.updatedAt)}</div>
              </div>
              <div className="line">
                <div className="message">
                  {LongStringUtil(room.lastMessage, 20)}
                </div>
                <div className="read">
                  <Badge count={room.notReadCount} overflowCount={300} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default RoomComponent;
