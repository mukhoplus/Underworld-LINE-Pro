package com.mukho.linepro.dto.room;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RoomParticipants {
    private Integer roomId;
    private Integer userId;
}
