import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import IconFont from '@components/Iconfont';
import styles from './index.less';

const { MonthPicker } = DatePicker;

function disabledDate(current) {
  return current && current < moment('2016-1-1');
}

const AxxMonthPicker = props => {
  const [year, setYear] = useState(2019);
  const [month, setMonth] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const today = moment();
    setYear(today.format('Y'));
    setMonth(today.format('M'));
  });

  function onChange(time) {
    setPickerOpen(!pickerOpen);
    // 触发父组件的onchange
    props.onChange(time);
  }

  return (
    <div className={styles['override-antd-month-picker']}>
      <div className={styles.fakeMonthPicker}>
        {year}年{month}月
        <IconFont
          onClick={() => {
            setPickerOpen(!pickerOpen);
          }}
          type="iconcalendar"
          theme="twoTone"
          twoToneColor="#eb2f96"
          style={{ fontSize: '20px', color: '#eb2f96' }}
        />
      </div>
      <MonthPicker
        style={{ opacity: '0' }}
        open={pickerOpen}
        disabledDate={disabledDate}
        onChange={onChange}
        placeholder="Select month"
      />
    </div>
  );
};

export default AxxMonthPicker;
