package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.linepro.domain.Room;
import com.mukho.linepro.dto.room.RoomDto;

@Mapper
public interface RoomMapper {
	int createRoom(Room room);

	Room getRoomById(int roomId);

	List<RoomDto> getRoomListByUserId(int userId);

	Integer findOneToOneRoom(int userId1, int userId2);

	Integer findMeRoom(int userId);

	void updateRoom(int roomId, String lastMessage);
}