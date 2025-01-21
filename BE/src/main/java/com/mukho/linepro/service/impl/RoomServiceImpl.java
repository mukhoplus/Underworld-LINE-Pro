package com.mukho.linepro.service.impl;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mukho.linepro.dto.room.RoomDto;
import com.mukho.linepro.dto.user.LoginUserDto;
import com.mukho.linepro.mapper.RoomMapper;
import com.mukho.linepro.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomMapper roomMapper;

    @Override
    public int createRoom(String identifier) {
        return roomMapper.createRoom(identifier);
    }

    @Override
    public boolean isExistRoom(String identifier) {
        if (roomMapper.isExistRoom(identifier) == 0) {
            return false;
        }
        return true;
    }

    @Override
    public void updateRoom(int roomId, String message) {
        roomMapper.updateRoom(roomId, message);
    }

    @Override
    public String getIdentifier(int roomId) {
        return roomMapper.getIdentifier(roomId);
    }

    @Override
    public List<RoomDto> getRoomListByUserId(int userId) {
        return roomMapper.getRoomListByUserId(userId);
    }

    @Override
    public int getRoomIdByUserId(int userId) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
        LoginUserDto loginUserDto = (LoginUserDto) session.getAttribute("loginUser");
        int currentUserId = loginUserDto.getUserId();

        String identifier = getIdentifier(currentUserId, userId);
        int result;

        try {
            result = roomMapper.getRoomIdByIdentifier(identifier);
        } catch (Exception e) {
            roomMapper.createRoom(identifier);
            result = roomMapper.getRoomIdByIdentifier(identifier);
        }

        return result;
    }

    public String getIdentifier(int currentUserId, int userId) {
        String result = "";

        if (currentUserId < userId) {
            result = String.format("%d-%d", currentUserId, userId);
        } else {
            result = String.format("%d-%d", userId, currentUserId);
        }

        return result;
    }

}
