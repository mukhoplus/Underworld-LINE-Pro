package com.mukho.linepro.mapper;

import java.util.List;

import com.mukho.linepro.domain.Chat;
import org.apache.ibatis.annotations.Mapper;

import com.mukho.linepro.dto.chat.ChatDto;
import com.mukho.linepro.dto.chat.SendChatDto;

@Mapper
public interface ChatMapper {
    List<ChatDto> getChatListByRoomId(int roomId);
    int sendChat(Chat chat);
    void readChat(SendChatDto sendChatDto);
}
