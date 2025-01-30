package com.mukho.linepro.dto.room;

import lombok.Data;
import java.util.List;

@Data
public class CreateGroupRoomDto {
    private String roomName;
    private List<Integer> userIds;
}
