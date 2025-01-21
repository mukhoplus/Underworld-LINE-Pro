package com.mukho.linepro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mukho.linepro.dto.chat.ChatDto;
import com.mukho.linepro.dto.chat.SendChatDto;
import com.mukho.linepro.mapper.ChatMapper;
import com.mukho.linepro.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMapper chatMapper;

    @Override
    public List<ChatDto> getChatList(int roomId) {
        return chatMapper.getChatList(roomId);
    }

    @Override
    public int sendChat(SendChatDto sendChatDto) {
        return chatMapper.sendChat(sendChatDto);
    }

    @Override
    public int sendSelfChat(SendChatDto sendChatDto) {
        return chatMapper.sendSelfChat(sendChatDto);
    }

    @Override
    public void readChat(SendChatDto sendChatDto) {
        chatMapper.readChat(sendChatDto);
    }

}
