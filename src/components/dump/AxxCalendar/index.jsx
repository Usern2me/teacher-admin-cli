import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import IconFont from '@components/IconFont';
import moment from 'moment';

import styles from './index.less';

const statusText = ['课前迟到', '迟到10分钟以内', '迟到10分钟以上'];
class AxxCalendar extends Component {
  state = {
    dateValue: moment(),
  };

  getListData = value => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [{ type: 'default' }];
        break;
      case 10:
        listData = [{ type: 'default' }];
        break;
      case 15:
        listData = [{ type: 'default' }];
        break;
      default:
    }
    return listData || [];
  };

  dateCellRender = value => {
    const listData = this.getListData(value);
    console.log('aaa', listData, value);
    return (
      <>
        {listData.map((item, index) => (
          <Badge key={index} className={styles.calendar_badge} status={item.type} />
        ))}
      </>
    );
  };

  onSelect = value => {
    this.props.onChange(value);
    this.setState({ dateValue: value });
  };

  onPanelChange = (date, type) => {
    let changeDate;
    changeDate = type ? date.clone().add(1, 'months') : date.clone().subtract(1, 'months');
    this.props.onPanelChange(changeDate);
    this.setState({ dateValue: changeDate });
  };

  render() {
    const { dateValue } = this.state;
    return (
      <div className={styles['override-axx-calendar']}>
        <Calendar
          value={dateValue}
          fullscreen={false}
          headerRender={({ value }) => {
            const year = value.year();
            const month = value.month() + 1;
            return (
              <div className={styles.customHeader}>
                <div className={styles.customHeader_content}>
                  <div>
                    <IconFont
                      onClick={() => {
                        this.onPanelChange(value, 0);
                      }}
                      className={styles.icon}
                      type="iconarrowLeft"
                    ></IconFont>
                    <span className={styles.year}>
                      {year}年{month}月
                    </span>
                    <IconFont
                      onClick={() => {
                        this.onPanelChange(value, 1);
                      }}
                      className={styles.icon}
                      type="iconarrowRight"
                    ></IconFont>
                    <div className={styles.statusContent}>
                      {statusText.map(v => (
                        <span key={v} className={styles.statusContent_text}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
          dateCellRender={this.dateCellRender}
          onSelect={this.onSelect}
        ></Calendar>
      </div>
    );
  }
}
export default AxxCalendar;
