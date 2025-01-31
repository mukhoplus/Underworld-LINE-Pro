package com.mukho.linepro.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface RoomParticipantsMapper {
    void addParticipant(int roomId, int userId);
    void updateLastReadChat(int roomId, int userId, int chatId);
    List<Integer> getParticipantsByRoomId(int roomId);
    int getLastReadChatId(int roomId, int userId);
    int getUnreadCount(int roomId, int userId);
}
