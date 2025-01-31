package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomParticipantsMapper {
	void addParticipant(int roomId, int userId);

	void updateLastReadChat(int roomId, int userId, int chatId);

	List<Integer> getParticipantsByRoomId(int roomId);

}
