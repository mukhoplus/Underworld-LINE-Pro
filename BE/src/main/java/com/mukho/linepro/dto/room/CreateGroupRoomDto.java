package com.mukho.linepro.dto.room;

import java.util.List;

import lombok.Data;

@Data
public class CreateGroupRoomDto {
	private String roomName;
	private List<Integer> userIds;
}
