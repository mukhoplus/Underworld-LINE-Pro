package com.mukho.linepro.dto.room;

import lombok.Data;

@Data
public class UpdateLastReadDto {
	private int roomId;
	private int userId;
	private int chatId;
} 