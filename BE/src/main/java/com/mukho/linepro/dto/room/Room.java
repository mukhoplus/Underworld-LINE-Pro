package com.mukho.linepro.dto.room;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Room {
    int roomId;
    String roomType;
    String name;
    String lastMessage;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "KST")
    LocalDateTime updatedAt;
}
