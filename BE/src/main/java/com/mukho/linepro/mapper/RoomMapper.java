package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.linepro.dto.room.RoomDto;

@Mapper
public interface RoomMapper {
    int createRoom(String identifier);
    int isExistRoom(String identifier);
    int updateRoom(int roomId, String message);
    String getIdentifier(int roomId);
    List<RoomDto> getRoomListByUserId(int userId);
    int getRoomIdByIdentifier(String identifier);
}