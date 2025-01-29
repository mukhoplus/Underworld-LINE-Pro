package com.mukho.linepro.controller;

import com.mukho.linepro.dto.room.UpdateLastReadDto;
import com.mukho.linepro.service.RoomParticipantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/participants")
public class RoomParticipantsController {
    @Autowired
    private RoomParticipantsService participantsService;

    @PostMapping("/read")
    public ResponseEntity<?> updateLastReadChat(@RequestBody UpdateLastReadDto dto) {
        try {
            participantsService.updateLastReadChat(dto.getRoomId(), dto.getUserId(), dto.getChatId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getParticipants(@PathVariable int roomId) {
        try {
            return ResponseEntity.ok(participantsService.getParticipantsByRoomId(roomId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
