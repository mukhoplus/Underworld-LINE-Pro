package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.linepro.dto.chat.ChatDto;
import com.mukho.linepro.dto.chat.SendChatDto;

@Mapper
public interface ChatMapper {
    List<ChatDto> getChatList(int roomId);
    int sendChat(SendChatDto sendChatDto);
    int sendSelfChat(SendChatDto sendChatDto);
    void readChat(SendChatDto sendChatDto);
}
