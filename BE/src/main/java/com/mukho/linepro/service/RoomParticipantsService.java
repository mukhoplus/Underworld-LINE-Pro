package com.mukho.linepro.service;

import java.util.List;

public interface RoomParticipantsService {
    void addParticipant(int roomId, int userId);
    void updateLastReadChat(int roomId, int userId, int chatId);
    List<Integer> getParticipantsByRoomId(int roomId);
    int getLastReadChatId(int roomId, int userId);
    int getUnreadCount(int roomId, int userId);
}
