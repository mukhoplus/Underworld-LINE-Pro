// 최근 알림을 추적하여 중복 방지
let lastNotification: {
  title: string;
  body: string;
  timestamp: number;
} | null = null;
const NOTIFICATION_COOLDOWN = 1000; // 1초 쿨다운

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const showNotification = (title: string, body: string) => {
  if (Notification.permission !== "granted") {
    return;
  }

  const now = Date.now();

  // 중복 알림 방지: 같은 내용이고 쿨다운 시간 내라면 표시하지 않음
  if (
    lastNotification &&
    lastNotification.title === title &&
    lastNotification.body === body &&
    now - lastNotification.timestamp < NOTIFICATION_COOLDOWN
  ) {
    return;
  }

  new Notification(title, {
    body,
    icon: "/logo192.png", // FE/public 경로 수정
  });

  // 마지막 알림 정보 업데이트
  lastNotification = { title, body, timestamp: now };
};
