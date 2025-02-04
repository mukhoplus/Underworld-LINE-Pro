import { Avatar } from "antd";
import React, { useState } from "react";
import { CreateRoomDto } from "src/interfaces/Room";
import { UserListDto } from "src/interfaces/User";
import { axiosRequest } from "src/services/AxiosService";
import styled from "styled-components";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  userList: UserListDto[];
  userId: number;
  onRoomCreated: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  userList,
  userId,
  onRoomCreated,
}) => {
  const [roomName, setRoomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const filteredUserList = userList.filter((user) => user.userId !== userId);

  const handleUserSelect = (selectedUserId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(selectedUserId)
        ? prev.filter((id) => id !== selectedUserId)
        : [...prev, selectedUserId]
    );
  };

  const isValid = roomName.trim() !== "" && selectedUsers.length >= 2;
  const showNameError = roomName.trim() === "";
  const showUserError = selectedUsers.length < 2;

  const handleCreateRoom = async () => {
    const createRoomDto: CreateRoomDto = {
      roomName: roomName,
      participants: [...selectedUsers, userId],
    };

    try {
      await axiosRequest("post", "/room/group", createRoomDto);
      onRoomCreated();
      onClose();
      setRoomName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("방 생성 실패:", error);
    }
  };

  const closeHandle = () => {
    setRoomName("");
    setSelectedUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>그룹 채팅방 만들기</h2>
          <CloseButton onClick={closeHandle}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <InputGroup>
            <label>방 이름</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="방 이름을 입력하세요"
            />
            {showNameError && (
              <ErrorMessage>방 이름을 입력해주세요</ErrorMessage>
            )}
          </InputGroup>
          <UserListSection>
            <label>대화상대 선택</label>
            {showUserError && (
              <ErrorMessage>최소 2명 이상 선택해주세요</ErrorMessage>
            )}
            <UserListContainer>
              {filteredUserList.map((user) => (
                <UserItem
                  key={user.userId}
                  onClick={() => handleUserSelect(user.userId)}
                >
                  <UserInfo>
                    <Avatar size={40} style={{ marginRight: "12px" }} />
                    <UserName>{user.name}</UserName>
                  </UserInfo>
                  <CheckboxWrapper>
                    <CustomCheckbox
                      checked={selectedUsers.includes(user.userId)}
                    >
                      {selectedUsers.includes(user.userId) && (
                        <CheckMark>✓</CheckMark>
                      )}
                    </CustomCheckbox>
                  </CheckboxWrapper>
                </UserItem>
              ))}
            </UserListContainer>
          </UserListSection>
        </ModalBody>
        <ModalFooter>
          <CreateButton onClick={handleCreateRoom} disabled={!isValid}>
            생성
          </CreateButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #666;
`;

const ModalBody = styled.div`
  padding: 16px;
  overflow-y: auto;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const UserListSection = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

const UserListContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 8px;

  &::-webkit-scrollbar {
    width: 8px !important;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
    border-radius: 4px !important;
  }

  &::-webkit-scrollbar-thumb {
    background: #888 !important;
    border-radius: 4px !important;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555 !important;
  }

   &:hover {
    scrollbar-color: gray rgba(23, 107, 135, 0.1);
    
    &::-webkit-scrollbar-thumb {
      background-color: gray !important;
    }
  }
  
  &:active {
    &::-webkit-scrollbar-thumb {
      background-color: gray !important;
    }
  }
}
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const CheckboxWrapper = styled.div`
  margin-left: 12px;
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => (props.checked ? "#06c755" : "#ddd")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? "#06c755" : "white")};
  transition: all 0.2s;
`;

const CheckMark = styled.span`
  color: white;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
`;

const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
`;

const CreateButton = styled.button<{ disabled: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.disabled ? "#ddd" : "#06c755")};
  color: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ddd" : "#05b54a")};
  }
`;

export default CreateRoomModal;
