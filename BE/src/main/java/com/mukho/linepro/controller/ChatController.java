package com.mukho.linepro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukho.linepro.dto.chat.ChatDto;
import com.mukho.linepro.service.ChatService;

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