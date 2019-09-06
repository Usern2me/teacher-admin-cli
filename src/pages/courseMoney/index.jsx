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
import { AxxMonthPicker } from '@dump';
import TableList from './components/TableList';
import styles from './style.less';

/* eslint react/no-multi-comp:0 */
@connect(({ courseMoney, user, loading }) => ({
  courseMoney,
  user,
  loading: loading.models.rule,
}))
class CourseMoney extends Component {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'courseId',
    },
    {
      title: '学期',
      dataIndex: 'term',
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
    },
    {
      title: '班级人数',
      dataIndex: 'courseCount',
    },
    {
      title: '课程收入',
      dataIndex: 'price',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const today = moment();
    const startTime = today.clone().startOf('M');
    const endTime = today.clone().endOf('M');
    const year = today.clone().format('YYYY');
    const month = today.clone().format('MM');
    const { teacherId } = this.props.user.currentUser;
    const params = {
      startTime,
      endTime,
      month,
      year,
      term: [],
      teacherId,
    };
    dispatch({
      type: 'courseMoney/fetch',
      payload: params,
    });
  }

  onMonthChange = e => {
    const startTime = e.clone().startOf('M');
    const endTime = e.clone().endOf('M');
    const year = e.clone().format('YYYY');
    const month = e.clone().format('MM');
    const { teacherId } = this.props.user.currentUser;
    const params = {
      startTime,
      endTime,
      month,
      year,
      term: [],
      teacherId,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'courseMoney/fetch',
      payload: params,
    });
  };

  render() {
    const {
      courseMoney: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <AxxMonthPicker onChange={this.onMonthChange}></AxxMonthPicker>
        <TableList columns={this.columns} data={data} loading={loading}></TableList>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(CourseMoney);
