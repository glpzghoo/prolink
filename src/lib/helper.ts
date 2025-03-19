import { createTheme } from "@mui/material/styles";

export const calculateTime = (data: string) => {
  const timeago = (new Date().getTime() - new Date(data).getTime()) / 1000;

  const seconds = 1;
  const minutes = 60 * seconds;
  const hours = 60 * minutes;
  const days = 24 * hours;
  const weeks = 7 * days;
  const months = 30 * days; // Approximate month
  const years = 365 * days; // Approximate year

  if (timeago >= years) {
    return Math.floor(timeago / years) + " жилийн өмнө";
  } else if (timeago >= months) {
    return Math.floor(timeago / months) + " сарын өмнө";
  } else if (timeago >= weeks) {
    return Math.floor(timeago / weeks) + " долоо хоногийн өмнө";
  } else if (timeago >= days) {
    return Math.floor(timeago / days) + " хоногийн өмнө";
  } else if (timeago >= hours) {
    return Math.floor(timeago / hours) + " цагийн өмнө";
  } else if (timeago >= minutes) {
    return Math.floor(timeago / minutes) + " минутын өмнө";
  } else if (timeago >= seconds) {
    return Math.floor(timeago) + " секундийн өмнө";
  } else {
    return "дөнгөж сая";
  }
};
