package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.linepro.domain.Chat;
import com.mukho.linepro.dto.chat.ChatDto;

@Mapper
public interface ChatMapper {
	List<ChatDto> getChatListByRoomId(int roomId);

	int sendChat(Chat chat);
}
