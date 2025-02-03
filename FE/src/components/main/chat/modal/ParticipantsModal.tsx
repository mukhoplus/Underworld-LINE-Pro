import { Avatar, Modal } from "antd";
import React from "react";
import { RoomParticipantDto } from "src/interfaces/Room";
import styled from "styled-components";

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: RoomParticipantDto[];
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
  isOpen,
  onClose,
  participants,
}) => {
  return (
    <Modal title="대화 상대" open={isOpen} onCancel={onClose} footer={null}>
      <ParticipantsList>
        {participants.map((participant, index) => (
          <ParticipantItem key={index}>
            <Avatar size={40} style={{ marginRight: "12px" }} />
            <ParticipantName>
              {index === 0 && <Badge>나</Badge>}
              {participant.name}
            </ParticipantName>
          </ParticipantItem>
        ))}
      </ParticipantsList>
    </Modal>
  );
};

const ParticipantsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ParticipantName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const Badge = styled.span`
  background-color: #06c755;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
`;

export default ParticipantsModal;
