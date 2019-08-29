import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';

import styles from './index.less';

class AxxCalendar extends Component {
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
    return (
      <>
        {listData.map((item, index) => (
          <Badge key={index} className={styles.calendar_badge} status={item.type} />
        ))}
      </>
    );
  };

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  // validRange = () => [moment('2016-1-1'), moment('2020-12-31')];

  render() {
    return (
      <div className={styles['override-axx-calendar']}>
        <Calendar
          fullscreen={false}
          onPanelChange={this.onPanelChange}
          dateCellRender={this.dateCellRender}
          // validRange={this.validRange}
        ></Calendar>
      </div>
    );
  }
}
export default AxxCalendar;
