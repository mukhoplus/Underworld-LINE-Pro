import { Badge, Avatar } from "antd";
import { LongStringUtil } from "../../../utils/LongStringUtil";
import "./UserInfo.css";
import "../chat/index.css";

const UserInfo = ({ userId, userInfo, handleChatIdToRoomId }: any) => {
  return (
    <>
      <div className="user-list custom-scroll">
        {userInfo.map((user: any) => (
          <div
            className="user"
            key={user.userId}
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
            }}
            onClick={() => handleChatIdToRoomId(user.userId)}
          >
            <Avatar style={{ margin: "0px 10px 0px 10px" }} />
            {user.userId === userId ? (
              <>
                <Badge count="나" style={{ backgroundColor: "#06c755" }} />
                <span style={{ margin: "0 4px" }}>
                  {LongStringUtil(user.name, 22)}
                </span>
              </>
            ) : (
              <span>{LongStringUtil(user.name, 22)}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserInfo;
