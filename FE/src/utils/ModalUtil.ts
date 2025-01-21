import React from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

export const confirmModal = (title: string, content: string) => {
  return new Promise((resolve) => {
    Modal.confirm({
      title,
      icon: React.createElement(ExclamationCircleFilled),
      content,
      okText: "예",
      cancelText: "아니오",
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });
};

export const successModal = (title: string, content: string) => {
  return new Promise((resolve) => {
    Modal.success({
      title,
      content,
      okText: "확인",
      onOk() {
        resolve(true);
      },
    });
  });
};

export const errorModal = (title: string, content: string) => {
  return new Promise((resolve) => {
    Modal.error({
      title,
      content,
      okText: "확인",
      onOk() {
        resolve(true);
      },
    });
  });
};

export const warningModal = (title: string, content: string) => {
  return new Promise((resolve) => {
    Modal.warning({
      title,
      content,
      okText: "확인",
      onOk() {
        resolve(true);
      },
    });
  });
};
