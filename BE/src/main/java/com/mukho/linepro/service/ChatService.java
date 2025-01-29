package com.mukho.linepro.service;

import java.util.List;

import com.mukho.linepro.dto.chat.ChatDto;
import com.mukho.linepro.dto.chat.SendChatDto;

public interface ChatService {
    List<ChatDto> getChatList(int roomId);
    int sendChat(SendChatDto sendChatDto);
    void readChat(SendChatDto sendChatDto);
}
