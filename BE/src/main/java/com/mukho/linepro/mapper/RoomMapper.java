package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mukho.linepro.domain.Room;
import com.mukho.linepro.dto.room.RoomDto;
import com.mukho.linepro.dto.room.RoomParticipantDto;

@Mapper
public interface RoomMapper {
	int createRoom(Room room);

	Room getRoomById(int roomId);

	List<RoomDto> getRoomListByUserId(int userId);

	Integer findOneToOneRoom(int userId1, int userId2);

	Integer findMeRoom(int userId);

	void updateRoom(int roomId, String lastMessage);

	List<RoomParticipantDto> getRoomParticipants(@Param("roomId") int roomId,
		@Param("currentUserId") int currentUserId);

}