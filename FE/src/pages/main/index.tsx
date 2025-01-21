import React from "react";
import ChatComponent from "../../components/main/chat/ChatComponent";
import InfoComponent from "../../components/main/info/InfoComponent";

const Main: React.FC = () => {
  return (
    <div className="main">
      <InfoComponent />
      <ChatComponent />
    </div>
  );
};

export default Main;
