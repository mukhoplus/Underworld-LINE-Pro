import "./Hello.css";

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  IdcardOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

import { useAuth } from "../../hooks/useAuth";
import { SignupDto } from "../../interfaces/User";
import { axiosRequest } from "../../services/AxiosService";
import { errorModal, successModal, warningModal } from "../../utils/ModalUtil";

interface SignupComponentProps {
  setPage: (page: number) => void;
}

const SignupComponent: React.FC<SignupComponentProps> = ({ setPage }) => {
  const { checkSession } = useAuth();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isIdOk, setIsIdOk] = useState<boolean>(false);
  const [isPasswordOk, setIsPasswordOk] = useState<boolean>(false);
  const [isNameOk, setIsNameOk] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async () => {
    if (!(isIdOk && isPasswordOk && isNameOk)) {
      await warningModal("알림", "입력한 정보를 다시 확인해주세요.");
      return;
    }

    const postData: SignupDto = {
      id: id,
      password: password,
      name: name,
    };

    axiosRequest("post", "/user/signup", postData)
      .then(async () => {
        await successModal("회원가입 성공", "회원가입이 완료되었습니다.");
        await checkSession();
        setPage(0);
      })
      .catch(async () => {
        await errorModal("회원가입 실패", "서버에 오류가 발생했습니다.");
      });
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignup();
    }
  };

  return (
    <SignupForm>
      <h1 className="title">회원가입</h1>
      <Form.Item
        name="id"
        rules={[
          {
            validator: async (rule, value) => {
              if (value.length === 0) {
                setIsIdOk(false);
                return Promise.reject("아이디를 입력해주세요.");
              }

              if (!/^[a-z0-9_-]{5,20}$/.test(value)) {
                setIsIdOk(false);
                return Promise.reject(
                  "5-20자의 영어 소문자, 숫자, _, -만 사용 가능합니다."
                );
              }

              try {
                const response = await axiosRequest("get", `/user/id/${value}`);

                if (!response.data) {
                  setIsIdOk(true);
                  return Promise.resolve();
                } else {
                  setIsIdOk(false);
                  return Promise.reject("사용할 수 없는 아이디입니다.");
                }
              } catch (error) {
                setIsIdOk(false);
                return Promise.reject("에러가 발생했습니다.");
              }
            },
          },
        ]}
      >
        <Input
          prefix={<IdcardOutlined />}
          placeholder="아이디"
          onChange={(event) => setId(event.target.value)}
          maxLength={20}
          autoComplete="off"
          onKeyPress={handleEnterKey}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            validator: (rule, value) => {
              if (value.length === 0) {
                setIsPasswordOk(false);
                return Promise.reject("비밀번호를 입력해주세요.");
              }

              if (!/^[a-zA-Z0-9_\-!@#$%^&*]{8,16}$/.test(value)) {
                setIsPasswordOk(false);
                return Promise.reject(
                  "8-16자의 영어, 숫자, 특수문자만 사용 가능합니다."
                );
              }

              const hasEnglish = /[a-zA-Z]/.test(value);
              const hasNumber = /[0-9]/.test(value);
              const hasSpecialCharacter = /[_\-!@#$%^&*]/.test(value);

              if (!hasEnglish || !hasNumber || !hasSpecialCharacter) {
                setIsPasswordOk(false);
                return Promise.reject(
                  "영어, 숫자, 특수문자가 각각 1자 이상씩 있어야 합니다."
                );
              }

              setIsPasswordOk(true);
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          type={passwordVisible ? "text" : "password"}
          prefix={<LockOutlined />}
          placeholder="비밀번호"
          onChange={(event) => setPassword(event.target.value)}
          maxLength={16}
          autoComplete="off"
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
      <Form.Item
        name="name"
        rules={[
          {
            validator: async (rule, value) => {
              if (value.length === 0) {
                setIsNameOk(false);
                return Promise.reject("이름를 입력해주세요.");
              }

              if (!/^[가-힣A-Za-z]{1,40}$/.test(value)) {
                setIsNameOk(false);
                return Promise.reject(
                  "1~40자의 한글, 영문 대/소문자를 사용해 주세요."
                );
              }

              try {
                const response = await axiosRequest(
                  "get",
                  `/user/name/${value}`
                );

                if (!response.data) {
                  setIsNameOk(true);
                  return Promise.resolve();
                } else {
                  setIsNameOk(false);
                  return Promise.reject("사용할 수 없는 아이디입니다.");
                }
              } catch (error) {
                setIsNameOk(false);
                return Promise.reject("에러가 발생했습니다.");
              }
            },
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="이름"
          onChange={(event) => setName(event.target.value)}
          maxLength={40}
          autoComplete="off"
          onKeyPress={handleEnterKey}
        />
      </Form.Item>
      <Form.Item className="form-btn">
        <Button
          className="hello-btn"
          style={{ border: "1px solid lightgray", marginRight: "10px" }}
          onClick={() => setPage(0)}
        >
          뒤로가기
        </Button>
        <Button
          type="primary"
          className="hello-btn"
          style={{ backgroundColor: "#06c755" }}
          onClick={handleSignup}
        >
          회원가입
        </Button>
      </Form.Item>
    </SignupForm>
  );
};

const SignupForm = styled(Form)`
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

export default SignupComponent;
