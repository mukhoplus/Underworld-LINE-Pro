package com.mukho.linepro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukho.linepro.domain.Room;
import com.mukho.linepro.dto.room.CreateGroupRoomDto;
import com.mukho.linepro.dto.room.CreateOneToOneRoomDto;
import com.mukho.linepro.dto.room.RoomDto;
import com.mukho.linepro.dto.room.RoomParticipantDto;
import com.mukho.linepro.service.RoomService;

@RestController
@RequestMapping("/room")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@PostMapping("/one")
	public ResponseEntity<Integer> createOneToOneRoom(@RequestBody CreateOneToOneRoomDto dto) {
		try {
			return ResponseEntity.ok(roomService.createOneToOneRoom(dto.getUserId1(), dto.getUserId2()));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@PostMapping("/group")
	public ResponseEntity<Integer> createGroupRoom(@RequestBody CreateGroupRoomDto dto) {
		try {
			return ResponseEntity.ok(roomService.createGroupRoom(dto));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/list/{userId}")
	public ResponseEntity<List<RoomDto>> getRoomListByUserId(@PathVariable int userId) {
		try {
			return ResponseEntity.ok(roomService.getRoomListByUserId(userId));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<Integer> getRoomIdByUserId(@PathVariable int userId) {
		try {
			return ResponseEntity.ok(roomService.getRoomIdByUserId(userId));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{roomId}")
	public ResponseEntity<Room> getRoomInfo(@PathVariable int roomId) {
		try {
			return ResponseEntity.ok(roomService.getRoomById(roomId));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{roomId}/participants/{currentUserId}")
	public ResponseEntity<List<RoomParticipantDto>> getRoomParticipants(
		@PathVariable int roomId, @PathVariable int currentUserId
	) {
		try {
			List<RoomParticipantDto> participants = roomService.getRoomParticipants(roomId, currentUserId);
			return ResponseEntity.ok(participants);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
