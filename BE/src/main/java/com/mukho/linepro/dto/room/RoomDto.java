package com.mukho.linepro.dto.room;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RoomDto {
	private int roomId;
	private String roomType;
	private String roomName;
	private String lastMessage;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "KST")
	private LocalDateTime updatedAt;
	private int lastReadChatId;
	private int notReadCount;
	private int participantCount;
}
