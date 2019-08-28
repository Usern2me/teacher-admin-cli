const transferDate = date => {
  // 年
  const year = date.getFullYear();
  // 月
  let month = date.getMonth() + 1;
  // 日
  let day = date.getDate();

  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`;
  }

  const dateString = `${year}-${month}-${day}`;

  return dateString;
};
const getWeek = val => {
  let date;
  const dateList = [];
  val ? (date = new Date(val)) : (date = new Date());

  const today = date.getDay();

  // 上周日距离今天的天数（负数表示）
  const stepSunDay = -today;

  const time = date.getTime();

  for (let i = 1; i < 8; i += 1) {
    dateList.push(transferDate(new Date(time + (stepSunDay + i - 1) * 24 * 3600 * 1000)));
  }

  return dateList;
};

const getMonth = () => {
  // 获取当前月的第一天
  const start = new Date();
  start.setDate(1);

  // 获取当前月的最后一天
  const date = new Date();
  const currentMonth = date.getMonth();
  const nextMonth = currentMonth + 1;
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  const oneDay = 1000 * 60 * 60 * 24;
  const end = new Date(nextMonthFirstDay - oneDay);

  const startDate = transferDate(start); // 日期变换
  const endDate = transferDate(end); // 日期变换

  return `${startDate} - ${endDate}`;
};
export { transferDate, getWeek, getMonth };
