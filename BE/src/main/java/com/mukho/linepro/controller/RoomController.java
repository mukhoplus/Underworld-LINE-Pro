package com.mukho.linepro.controller;

import com.mukho.linepro.domain.Room;
import com.mukho.linepro.dto.room.CreateGroupRoomDto;
import com.mukho.linepro.dto.room.CreateOneToOneRoomDto;
import com.mukho.linepro.dto.room.RoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mukho.linepro.service.RoomService;

import java.util.List;

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

}
