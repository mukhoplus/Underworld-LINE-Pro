export const isInNotReadMessages = (userId: number, newMessages: any) => {
  return newMessages.some(
    (message: any) => message.sendUserId !== userId && message.notReadCount > 0
  );
};
