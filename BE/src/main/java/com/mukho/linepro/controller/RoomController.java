package com.mukho.linepro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukho.linepro.service.RoomService;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<?> createRoom(String identifier) {
        try {
            if (roomService.createRoom(identifier) == 0) {
                throw new Exception();
            }
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<?> isExistRoom(@PathVariable String identifier) {
        try {
            return ResponseEntity.ok(roomService.isExistRoom(identifier));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<?> getRoomListByUserId(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(roomService.getRoomListByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRoomIdByUserId(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(roomService.getRoomIdByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
