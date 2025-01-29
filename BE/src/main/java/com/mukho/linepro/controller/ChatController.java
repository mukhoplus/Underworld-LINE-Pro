package com.mukho.linepro.controller;

import com.mukho.linepro.dto.chat.ChatDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mukho.linepro.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/{roomId}")
    public ResponseEntity<List<ChatDto>> getChatsByRoomId(@PathVariable int roomId) {
        try {
            return ResponseEntity.ok(chatService.getChatList(roomId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}