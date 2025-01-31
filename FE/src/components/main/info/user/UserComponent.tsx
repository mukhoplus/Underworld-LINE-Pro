import "./UserComponent.css";
import "../../chat/ChatComponent.css";

import { Avatar, Badge } from "antd";
import { useEffect, useState } from "react";
import { RoomDto } from "src/interfaces/Room";

import { UserListDto } from "../../../../interfaces/User";
import { axiosRequest } from "../../../../services/AxiosService";
import { LongStringUtil } from "../../../../utils/LongStringUtil";

const UserComponent = ({
  userId,
  userList,
  setRoomId,
  roomList,
  setRoomList,
}: {
  userId: number;
  userList: UserListDto[];
  setRoomId: (id: number) => void;
  roomList: RoomDto[];
  setRoomList: (list: RoomDto[]) => void;
}) => {
  const [userInfo, setUserInfo] = useState<UserListDto[]>([]);

  const getMyInfo = () => {
    return userList.find((item: UserListDto) => item.userId === userId);
  };

  const getFriendInfo = () => {
    return userList.filter((item: UserListDto) => item.userId !== userId);
  };

  const handleUserInfo = () => {
    if (userList.length === 0) return;

    const myInfo = getMyInfo();
    const friendInfo = getFriendInfo();

    setUserInfo([{ ...myInfo } as UserListDto, ...friendInfo]);
  };

  const handleChatIdToRoomId = async (userId: Number) => {
    await axiosRequest("get", `/room/user/${userId}`)
      .then((response: any) => {
        const responseRoomId = response.data;
        setRoomId(response.data);

        // 신규 생성 또는 방 목록이 없을 경우 방 목록 갱신
        if (!roomList.find((room: RoomDto) => room.roomId === responseRoomId)) {
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
      {userInfo.map((user: UserListDto) => (
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
          <Avatar size={40} style={{ margin: "0px 10px 0px 10px" }} />
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
