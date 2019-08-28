import React, { Component } from 'react';
import { DatePicker } from 'antd';
import momentJS from 'moment';
import IconFont from '@components/Iconfont';
import { getWeek, transferDate } from '@/utils/moment';
import styles from './index.less';

const weeksTexts = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
class MonthList extends Component {
  state = {
    year: 2019,
    month: 8,
    day: 25,
    week: 3, // 第几周
    weekIndex: 0, // 星期几
    selectDay: '2019-8-25', // 用户选择的日期
    dateList: [1, 2, 3, 4, 5, 6, 7],
    pickerOpen: false
  };

  componentDidMount() {
    this.returnToday();
  }

  // 把'2019-8-15'转换成{year:2019,month:7,day:15,week:3,weekIndex:4}
  transformDateToIndex = dateVal => {
    let week = 0; // 本月的第几周
    const date = new Date(dateVal);
    let [year, month, day] = dateVal.split('-');
    const weekIndex = date.getDay(); // 星期几

    week = Math.ceil(date.getDate() / 7);
    if (date.getDate() < 7 && date.getDay() !== 1) {
      week = 5;
      month -= 1;
    }
    return {
      year,
      month,
      day,
      week,
      weekIndex
    };
  };

  // 修改下面的日期数组
  formatDateList = val => {
    val = val || 0;
    const weeks = getWeek(val);
    const resultWeeks = [];
    weeks.map(week => resultWeeks.push(week.split('-')[2]));
    this.setState({ dateList: resultWeeks });
  };

  handleSelectDate = (e, dayIndex) => {
    const { dateList, year, month } = this.state;
    const today = dateList[dayIndex];
    this.setState({ selectDay: `${year}-${month}-${today}`, day: today, weekIndex: dayIndex });
  };

  returnToday = () => {
    const today = transferDate(new Date());
    const todayIndex = this.transformDateToIndex(today);
    this.formatDateList(today);
    this.setState(todayIndex);
    this.setState({ selectDay: today });
  };

  toNextWeek = flag => {
    // false 前七天 true 后七天
    let time = 7 * 24 * 3600 * 1000;
    flag && (time = -time);
    const { selectDay } = this.state;
    const today = new Date(selectDay);
    const resultDay = transferDate(new Date(today - time));
    this.setDateState(resultDay);
  };

  setDateState = date => {
    const [year, month, day] = date.split('-');
    this.setState({
      year,
      month,
      day,
      selectDay: date
    });
    this.formatDateList(date);
  };

  handleDataPicker = time => {
    this.setDateState(time.format('YYYY-MM-DD'));
    this.setState({ weekIndex: +time.format('e') + 1 });
  };

  togglePicker = () => {
    const { pickerOpen } = this.state;
    this.setState({ pickerOpen: !pickerOpen });
  };

  render() {
    const {
 weekIndex, year, month, pickerOpen, dateList
} = this.state;

    return (
      <div className={styles.MonthListContainer}>
        <div className={styles.month}>
          <div className={styles.fakeDataPicker}>
            {year}年{month}月
            <IconFont
              onClick={this.togglePicker}
              className={styles.icon}
              type="icon-arrowdown1"
              style={{ fontSize: '20px' }}
            />
          </div>
          <DatePicker
            onChange={this.handleDataPicker}
            open={pickerOpen}
            className={styles.dataPicker}
          />
        </div>
        <div className={styles.statusInfo}>
          <div className={styles.statusInfo_texts}>
            {['迟到五分钟', '迟到5-10分钟', '迟到10分钟以上'].map(text => (
              <span key={text}>{text}</span>
            ))}
          </div>
          <div className={styles.statusInfo_today}>
            <i onClick={() => this.toNextWeek(false)}> &lt; </i>
            <span onClick={this.returnToday}>今天</span>
            <i onClick={() => this.toNextWeek(true)}> &gt; </i>
          </div>
        </div>
        <div className={styles.weekBoxs}>
          {weeksTexts.map((weekText, index) => (
            <div
              onClick={e => this.handleSelectDate(e, index)}
              key={index}
              className={`${styles.weekBox} ${index === weekIndex ? styles.weekBox_select : ''}`}
            >
              <div className={styles.weekBox_text}>{weekText}</div>
              <div className={styles.weekBox_day}>{dateList[index]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MonthList;
