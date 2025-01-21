package com.mukho.linepro.service;

import java.util.List;

import com.mukho.linepro.dto.room.RoomDto;

public interface RoomService {
    int createRoom(String identifier);
    boolean isExistRoom(String identifier);
    void updateRoom(int roomId, String message);
    String getIdentifier(int roomId);
    List<RoomDto> getRoomListByUserId(int userId);
    int getRoomIdByUserId(int userId);
}
