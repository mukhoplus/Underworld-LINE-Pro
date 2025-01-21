import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userIdState,
  userListState,
  roomListState,
  roomIdState,
  chatListState,
  getSessionUserId,
} from "./stores/atoms";
import Hello from "./pages/hello";
import Main from "./pages/main";

const App: React.FC = () => {
  const [isSession, setIsSession] = useState<boolean>(false);

  const userId = useRecoilValue(userIdState);
  const userList = useRecoilValue(userListState);
  const roomList = useRecoilValue(roomListState);
  const roomId = useRecoilValue(roomIdState);
  const chatList = useRecoilValue(chatListState);

  const setUserId = useSetRecoilState(userIdState);

  useEffect(() => {
    getSessionUserId(setUserId, setIsSession);
  }, [userId, setUserId]);

  if (!isSession) return null;

  return (
    <>
      {userId === 0 ? (
        <Hello setUserId={setUserId} setIsSession={setIsSession} />
      ) : (
        <Main
          userId={userId}
          userList={userList}
          roomList={roomList}
          roomId={roomId}
          chatList={chatList}
        />
      )}
    </>
  );
};

export default App;
