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
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          }}
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

export default ChatBlank;
