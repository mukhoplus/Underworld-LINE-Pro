import { Avatar, Badge } from "antd";
import { getRoomDateTime } from "../../../utils/DateTimeUtil";
import { LongStringUtil } from "../../../utils/LongStringUtil";
import "./RoomInfo.css";
import "../chat/index.css";

const RoomInfo = ({ userId, roomList, setRoomId }: any) => {
  return (
    <>
      <div className="room-list custom-scroll">
        {roomList.map((room: any) => (
          <div
            className="room"
            key={room.roomId}
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
            }}
            onClick={() => setRoomId(room.roomId)}
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
                  {room.userId === userId ? (
                    <>
                      <Badge
                        count="나"
                        style={{ backgroundColor: "#06c755" }}
                      />
                      <span style={{ margin: "0 4px" }}>
                        {LongStringUtil(room.roomName, 15)}
                      </span>
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
    </>
  );
};

export default RoomInfo;
