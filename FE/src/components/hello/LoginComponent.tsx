import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  IdcardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { warningModal, errorModal } from "../../utils/ModalUtil";

import "./Hello.css";

const LoginComponent: React.FC<{ setPage: (page: number) => void }> = ({
  setPage,
}) => {
  const { login } = useAuth();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (!id || !password) {
      await warningModal("알림", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const result = await login(id, password);
    if (result === "unauthorized") {
      await errorModal(
        "로그인 실패",
        "아이디 또는 비밀번호가 일치하지 않습니다."
      );
    } else if (result === "conflict") {
      await errorModal("로그인 실패", "다른 환경에서 이미 로그인 중입니다.");
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <LoginForm>
      <h1 style={{ textAlign: "center", color: "#06c755" }}>Underworld LINE</h1>
      <Form.Item name="id">
        <Input
          prefix={<IdcardOutlined />}
          placeholder="아이디"
          onChange={(event) => setId(event.target.value)}
          maxLength={20}
          onKeyPress={handleEnterKey}
        />
      </Form.Item>
      <Form.Item name="password">
        <Input
          type={passwordVisible ? "text" : "password"}
          prefix={<LockOutlined />}
          placeholder="비밀번호"
          onChange={(event) => setPassword(event.target.value)}
          maxLength={16}
          onKeyPress={handleEnterKey}
          suffix={
            passwordVisible ? (
              <EyeOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            )
          }
        />
      </Form.Item>
      <Form.Item className="form-btn">
        <Button
          type="primary"
          className="hello-btn"
          style={{ backgroundColor: "#06c755", marginRight: "60px" }}
          onClick={handleLogin}
        >
          로그인
        </Button>
        <Button
          className="hello-btn"
          style={{ border: "1px solid lightgray" }}
          onClick={() => setPage(1)}
        >
          회원가입
        </Button>
      </Form.Item>
    </LoginForm>
  );
};

const LoginForm = styled(Form)`
  padding-top: 35%;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

export default LoginComponent;
