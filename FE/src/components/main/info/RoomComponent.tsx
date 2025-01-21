import RoomInfo from "./RoomInfo";

const RoomComponent = ({ userId, setRoomId, roomList }: any) => {
  return <RoomInfo userId={userId} roomList={roomList} setRoomId={setRoomId} />;
};

export default RoomComponent;
