const dayjs = require("dayjs");
const koLocale = require("dayjs/locale/ko");

dayjs.locale(koLocale);

const getStringToDateTime = (datetime: string) => {
  return dayjs(datetime);
};

export const getRoomDateTime = (datetime: string) => {
  const date = getStringToDateTime(datetime);
  const now = dayjs();

  if (date.isSame(now, "day")) {
    return date.format("A h:mm");
  } else if (date.isSame(now.subtract(1, "day"), "day")) {
    return "어제";
  } else if (date.isSame(now, "year")) {
    return date.format("M월D일");
  } else {
    return date.format("YYYY.MM.DD");
  }
};

export const getChatDate = (datetime: string) => {
  const date = getStringToDateTime(datetime);
  return date.format("YYYY년 M월 D일 dddd");
};

export const getChatTime = (datetime: string) => {
  const date = getStringToDateTime(datetime);
  return date.format("A h:mm");
};
