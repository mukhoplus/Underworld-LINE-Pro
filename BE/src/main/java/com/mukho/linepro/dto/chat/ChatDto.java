package com.mukho.linepro.dto.chat;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ChatDto {
    int chatId;
    int sendUserId;
    String message;
    int notRead;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "KST")
    LocalDateTime sendAt;
}
