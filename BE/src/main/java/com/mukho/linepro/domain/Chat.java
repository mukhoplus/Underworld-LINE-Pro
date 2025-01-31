package com.mukho.linepro.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Chat {
	int chatId;
	int roomId;
	int sendUserId;
	String message;
	boolean notRead;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "KST")
	LocalDateTime sendAt;
}
