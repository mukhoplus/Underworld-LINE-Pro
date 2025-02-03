package com.mukho.linepro.dto.chat;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mukho.linepro.dto.room.RoomDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class SocketResponseDto {
	List<RoomDto> roomList;
	ChatResponseDto chatResponseDto;
}
