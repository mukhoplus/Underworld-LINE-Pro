package com.mukho.linepro.domain;

import lombok.Data;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Room {
    private int roomId;
    private String roomType;
    private String name;
    private String lastMessage;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "KST")
    private LocalDateTime updatedAt;

    public void setRoomType(RoomType type) {
        this.roomType = type.toString();
    }

    public String getRoomType() {
        return RoomType.fromString(this.roomType).toString();
    }
} 