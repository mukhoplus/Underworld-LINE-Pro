const ChatBlank = () => {
  return (
    <div className="chat-component">
      <div
        className="chat-list"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <img
          src="/images/chat_blank.png"
          alt="새 채팅을 시작해보세요."
          style={{
            paddingTop: "84px",
            width: "131px",
            height: "137px",
          }}
        />
      </div>
    </div>
  );
};

export default ChatBlank;
