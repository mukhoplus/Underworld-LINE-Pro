package com.mukho.linepro.service;

import java.util.List;

import com.mukho.linepro.domain.Room;
import com.mukho.linepro.dto.room.CreateGroupRoomDto;
import com.mukho.linepro.dto.room.RoomDto;

public interface RoomService {
    int createOneToOneRoom(int userId1, int userId2);
    int createGroupRoom(CreateGroupRoomDto dto);
    List<RoomDto> getRoomListByUserId(int userId);
    void updateRoom(int roomId, String lastMessage);
    Room getRoomById(int roomId);
    int getRoomIdByUserId(int userId);
    boolean isParticipant(int roomId, int userId);
    String getRoomType(int roomId);
    String getRoomName(int roomId, int userId);
}
