package com.mukho.linepro.service.impl;

import java.util.List;

import com.mukho.linepro.domain.Chat;
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
        return chatMapper.getChatListByRoomId(roomId);
    }

    @Override
    public int sendChat(SendChatDto sendChatDto) {
        Chat chat = new Chat();

        chat.setRoomId(sendChatDto.getRoomId());
        chat.setSendUserId(sendChatDto.getSendUserId());
        chat.setMessage(sendChatDto.getMessage());

        chatMapper.sendChat(chat);
        return chat.getChatId();
    }

    @Override
    public void readChat(SendChatDto sendChatDto) {
        chatMapper.readChat(sendChatDto);
    }

}
