import { useState, useEffect } from "react";
import { Badge, Avatar } from "antd";
import { axiosRequest } from "../../../../services/AxiosService";
import { LongStringUtil } from "../../../../utils/LongStringUtil";
import { UserListDto } from "../../../../interfaces/User";
import "./UserComponent.css";
import "../../chat/ChatComponent.css";

const UserComponent = ({
  userId,
  userList,
  setRoomId,
  roomList,
  setRoomList,
}: {
  userId: number;
  userList: any[];
  setRoomId: (id: number) => void;
  roomList: any[];
  setRoomList: (list: any[]) => void;
}) => {
  const [userInfo, setUserInfo] = useState<UserListDto[]>([]);

  const getMyInfo = () => {
    return userList.find((item: any) => item.userId === userId);
  };

  const getFriendInfo = () => {
    return userList.filter((item: any) => item.userId !== userId);
  };

  const handleUserInfo = () => {
    if (userList.length === 0) return;

    const myInfo = getMyInfo();
    const friendInfo = getFriendInfo();

    setUserInfo([{ ...myInfo }, ...friendInfo]);
  };

  const handleChatIdToRoomId = async (userId: any) => {
    await axiosRequest("get", `/room/user/${userId}`)
      .then((response: any) => {
        const responseRoomId = response.data;
        setRoomId(response.data);

        // 신규 생성 또는 방 목록이 없을 경우 방 목록 갱신
        if (!roomList.find((room: any) => room.roomId === responseRoomId)) {
          axiosRequest("get", `/room/list/${userId}`).then((response) => {
            setRoomList(response.data);
          });
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    handleUserInfo();
  }, [userList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
  );
};

export default UserComponent;
