export const calculateTime = (data: string) => {
  const timeago = (new Date().getTime() - new Date(data).getTime()) / 1000;
  if (timeago / 60 / 60 / 24 > 1) {
    return Math.round(timeago / 60 / 60 / 24) + " хоногийн өмнө";
  } else if (timeago / 60 / 60 > 1) {
    return Math.round(timeago / 60 / 60) + " цаг өмнө";
  } else if (timeago / 60 > 1) {
    return Math.round(timeago / 60) + " мин өмнө";
  } else if (timeago > 1) {
    return Math.round(timeago) + " сек өмнө";
  } else {
    return "дөнгөж сая";
  }
};
