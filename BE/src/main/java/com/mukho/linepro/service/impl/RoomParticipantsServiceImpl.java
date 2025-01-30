package com.mukho.linepro.service.impl;

import com.mukho.linepro.mapper.RoomParticipantsMapper;
import com.mukho.linepro.service.RoomParticipantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoomParticipantsServiceImpl implements RoomParticipantsService {

    @Autowired
    private RoomParticipantsMapper participantsMapper;

    @Override
    public void addParticipant(int roomId, int userId) {
        participantsMapper.addParticipant(roomId, userId);
    }

    @Override
    @Transactional
    public void updateLastReadChat(int roomId, int userId, int chatId) {
        participantsMapper.updateLastReadChat(roomId, userId, chatId);
    }

    @Override
    public List<Integer> getParticipantsByRoomId(int roomId) {
        return participantsMapper.getParticipantsByRoomId(roomId);
    }

    @Override
    public int getLastReadChatId(int roomId, int userId) {
        return participantsMapper.getLastReadChatId(roomId, userId);
    }

    @Override
    public int getUnreadCount(int roomId, int userId) {
        return participantsMapper.getUnreadCount(roomId, userId);
    }
}