import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import StandardTable from './components/StandardTable';
import { AxxCalendar } from '@dump';
import styles from './style.less';

@connect(({ attendance, user, loading }) => ({
  attendance,
  user,
  loading: loading.models.rule,
}))
class Attendance extends Component {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'courseId',
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
    },
    {
      title: '课次名称',
      dataIndex: 'knowledgeName',
    },
    {
      title: '课程时间',
      dataIndex: 'knowledgeTime',
    },
    {
      title: '签到时间',
      dataIndex: 'attendanceTime',
    },
    {
      title: '补签',
      dataIndex: 'isRepair',
    },
  ];

  componentDidMount() {
    let today = moment();
    this.dispatchData(today, today);
  }
  onCalendarChange = data => {
    this.dispatchData(data, data);
  };
  onPanelChange = date => {
    const startDate = date.clone().startOf('month');
    const endDate = date.clone().endOf('month');
    this.dispatchData(startDate, endDate);
  };
  dispatchData = (startTime, endTime) => {
    const {
      dispatch,
      user: {
        currentUser: { userid },
      },
    } = this.props;
    const params = {
      startTime: startTime.format('YYYY-MM-DD'),
      endTime: endTime.format('YYYY-MM-DD'),
      teacherId: userid,
    };
    dispatch({
      type: 'attendance/fetch',
      payload: params,
    });
  };

  render() {
    const {
      attendance: { data },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper>
        <AxxCalendar onChange={this.onCalendarChange} onPanelChange={this.onPanelChange} />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable loading={loading} data={data} columns={this.columns} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Attendance);
