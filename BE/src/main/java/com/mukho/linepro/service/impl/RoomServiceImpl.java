package com.mukho.linepro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mukho.linepro.domain.Room;
import com.mukho.linepro.domain.RoomType;
import com.mukho.linepro.dto.room.CreateGroupRoomDto;
import com.mukho.linepro.dto.room.RoomDto;
import com.mukho.linepro.dto.room.RoomParticipantDto;
import com.mukho.linepro.dto.user.LoginUserDto;
import com.mukho.linepro.mapper.RoomMapper;
import com.mukho.linepro.mapper.RoomParticipantsMapper;
import com.mukho.linepro.mapper.UserMapper;
import com.mukho.linepro.service.RoomService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class RoomServiceImpl implements RoomService {
	@Autowired
	private RoomMapper roomMapper;

	@Autowired
	private RoomParticipantsMapper participantsMapper;

	@Autowired
	private UserMapper userMapper;

	@Override
	@Transactional
	public int createOneToOneRoom(int userId1, int userId2) {
		int id1 = Math.min(userId1, userId2);
		int id2 = Math.max(userId1, userId2);

		return existingOrCreateRoom(id1, id2);
	}

	@Override
	@Transactional
	public int createGroupRoom(CreateGroupRoomDto dto) {
		Room room = new Room();
		room.setRoomType(RoomType.GROUP);
		room.setName(dto.getRoomName());
		room.setLastMessage("");

		roomMapper.createRoom(room);
		int roomId = room.getRoomId();

		for (Integer userId : dto.getParticipants()) {
			participantsMapper.addParticipant(roomId, userId);
		}

		return roomId;
	}

	@Override
	public List<RoomDto> getRoomListByUserId(int userId) {
		List<RoomDto> roomList = roomMapper.getRoomListByUserId(userId);

		for (RoomDto room : roomList) {
			room.setRoomName(getRoomName(room.getRoomId(), userId));
		}

		return roomList;
	}

	@Override
	public void updateRoom(int roomId, String lastMessage) {
		roomMapper.updateRoom(roomId, lastMessage);
	}

	@Override
	public Room getRoomById(int roomId) {
		return roomMapper.getRoomById(roomId);
	}

	@Override
	@Transactional
	public int getRoomIdByUserId(int userId) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(false);
		LoginUserDto loginUserDto = (LoginUserDto)session.getAttribute("loginUser");
		int currentUserId = loginUserDto.getUserId();

		int id1 = Math.min(currentUserId, userId);
		int id2 = Math.max(currentUserId, userId);

		return existingOrCreateRoom(id1, id2);
	}

	@Override
	public boolean isParticipant(int roomId, int userId) {
		List<Integer> participants = participantsMapper.getParticipantsByRoomId(roomId);
		return participants.contains(userId);
	}

	@Override
	public String getRoomType(int roomId) {
		Room room = getRoomById(roomId);
		return room != null ? room.getRoomType() : null;
	}

	@Override
	public String getRoomName(int roomId, int userId) {
		Room room = getRoomById(roomId);
		if (room == null)
			return "";

		if (RoomType.fromString(room.getRoomType()) == RoomType.GROUP) {
			return room.getName();
		} else if (RoomType.fromString(room.getRoomType()) == RoomType.ME) {
			return userMapper.getName(userId);
		} else {
			List<Integer> participants = participantsMapper.getParticipantsByRoomId(roomId);
			int otherUserId = participants.stream().filter(id -> id != userId).findFirst().orElse(0);
			return userMapper.getName(otherUserId);
		}
	}

	public int existingOrCreateRoom(int id1, int id2) {
		Integer existingRoomId;

		if (id1 == id2) {
			existingRoomId = roomMapper.findMeRoom(id1);
		} else {
			existingRoomId = roomMapper.findOneToOneRoom(id1, id2);
		}

		if (existingRoomId != null) {
			return existingRoomId;
		}

		Room room = new Room();

		if (id1 == id2) {
			room.setRoomType(RoomType.ME);
			room.setName(userMapper.getName(id1));
		} else {
			room.setRoomType(RoomType.ONE_TO_ONE);
			room.setName("");
		}

		room.setLastMessage("");

		roomMapper.createRoom(room);
		int roomId = room.getRoomId(); // auto-generated key

		participantsMapper.addParticipant(roomId, id1);
		if (id1 != id2) {
			participantsMapper.addParticipant(roomId, id2);
		}

		return roomId;
	}

	@Override
	public List<RoomParticipantDto> getRoomParticipants(int roomId, int currentUserId) {
		return roomMapper.getRoomParticipants(roomId, currentUserId);
	}
}