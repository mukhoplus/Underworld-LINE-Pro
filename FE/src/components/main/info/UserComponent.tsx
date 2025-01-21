import { useState, useEffect } from "react";
import { axiosRequest } from "../../../services/AxiosService";
import UserInfo from "./UserInfo";
import { UserListDto } from "../../../interfaces/User";

const UserComponent = ({
  userId,
  userList,
  setRoomId,
}: {
  userId: number;
  userList: any[];
  setRoomId: (roomId: number) => void;
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
        setRoomId(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    handleUserInfo();
  }, [userList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserInfo
      userId={userId}
      userInfo={userInfo}
      handleChatIdToRoomId={handleChatIdToRoomId}
    />
  );
};

export default UserComponent;
