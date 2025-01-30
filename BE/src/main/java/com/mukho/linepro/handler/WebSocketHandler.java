package com.mukho.linepro.handler;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import com.mukho.linepro.service.RoomParticipantsService;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mukho.linepro.dto.chat.ChatDto;
import com.mukho.linepro.dto.chat.ChatResponseDto;
import com.mukho.linepro.dto.chat.SendChatDto;
import com.mukho.linepro.dto.chat.SocketResponseDto;
import com.mukho.linepro.dto.chat.SocketSendDto;
import com.mukho.linepro.dto.room.RoomDto;
import com.mukho.linepro.dto.user.LoginUserDto;
import com.mukho.linepro.service.ChatService;
import com.mukho.linepro.service.RoomService;

@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private Map<Integer, WebSocketSession> sessions = new ConcurrentHashMap<>();

    private RoomService roomService;
    private ChatService chatService;
    private RoomParticipantsService participantsService;

    @Autowired
    public WebSocketHandler(RoomService roomService, ChatService chatService, RoomParticipantsService participantsService) {
        this.roomService = roomService;
        this.chatService = chatService;
        this.participantsService = participantsService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        int userId = 0;

        try {
            HttpSession curUserSession = (HttpSession) session.getAttributes().get("httpSession");
            LoginUserDto loginUserDto = (LoginUserDto)curUserSession.getAttribute("loginUser");

            userId = loginUserDto.getUserId();
        } catch(Exception e) {
            System.out.println(e.getMessage());
//            if (session.getUri() == null) return;
//
//            String value = session.getUri().getQuery().split("=")[1];
//            userId = Integer.parseInt(value);
        }

        session.getAttributes().put("userId", userId);

        super.afterConnectionEstablished(session);
        sessions.put(userId, session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        try {
            HttpSession curUserSession = (HttpSession) session.getAttributes().get("httpSession");
            LoginUserDto loginUserDto = (LoginUserDto)curUserSession.getAttribute("loginUser");
            int userId = loginUserDto.getUserId();

            super.afterConnectionClosed(session, status);
            sessions.remove(userId);
            // curUserSession.invalidate();
        } catch (Exception e) {

        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage testMessage) throws Exception {
        try {
            String receivedMessage = testMessage.getPayload();
            ObjectMapper objectMapper = new ObjectMapper();

            SocketSendDto socketSendDto = objectMapper.readValue(receivedMessage, SocketSendDto.class);
            SendChatDto sendChatDto = socketSendDto.getData();

            int roomId = sendChatDto.getRoomId();
            int sendUserId = sendChatDto.getSendUserId();
            List<Integer> receiveUserIdList = getReceiveUserIdList(roomId, sendUserId);

            if (socketSendDto.getType().equals("chat")) {
                String message = sendChatDto.getMessage();
                roomService.updateRoom(roomId, message);

                int lastChatId = chatService.sendChat(new SendChatDto(roomId, sendUserId, message));
                participantsService.updateLastReadChat(roomId, sendUserId, lastChatId);
            } else {
                List<ChatDto> chatList = chatService.getChatList(roomId);

                if (!chatList.isEmpty()) {
                    int lastChatId = chatList.get(chatList.size() - 1).getChatId();
                    participantsService.updateLastReadChat(roomId, sendUserId, lastChatId);
                }
            }

            objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            List<RoomDto> sendRoomList = getRoomListByUserId(sendUserId);
            List<ChatDto> chatList = chatService.getChatList(roomId);
            ChatResponseDto chatResponseDto = new ChatResponseDto(roomId, chatList);

            SocketResponseDto sendUserDto = new SocketResponseDto(sendRoomList, chatResponseDto);
            sessions.get(sendUserId).sendMessage(new TextMessage(objectMapper.writeValueAsString(sendUserDto)));

            for (Integer receiveUserId : receiveUserIdList) {
                if (sessions.containsKey(receiveUserId) && sessions.get(receiveUserId).isOpen()) {
                    List<RoomDto> receiveRoomList = getRoomListByUserId(receiveUserId);
                    SocketResponseDto receiveUserDto = new SocketResponseDto(receiveRoomList, chatResponseDto);
                    sessions.get(receiveUserId).sendMessage(new TextMessage(objectMapper.writeValueAsString(receiveUserDto)));
                }
            }
        } catch (Exception e) {}
    }

    public List<Integer> getReceiveUserIdList(int roomId, int sendUserId) {
        List<Integer> participants = participantsService.getParticipantsByRoomId(roomId);
        List<Integer> receiveUserIdList = participants.stream().filter(userId -> userId != sendUserId).collect(Collectors.toList());

        return receiveUserIdList;
    }

    public List<RoomDto> getRoomListByUserId(int userId) {
        return roomService.getRoomListByUserId(userId);
    }

}
