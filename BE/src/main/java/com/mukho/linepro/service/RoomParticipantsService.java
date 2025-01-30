package com.mukho.linepro.service;

import java.util.List;

public interface RoomParticipantsService {
    void updateLastReadChat(int roomId, int userId, int chatId);
    List<Integer> getParticipantsByRoomId(int roomId);
}
