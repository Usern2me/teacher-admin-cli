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
  message
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { AxxMonthPicker } from '@dump';
import TableList from './components/TableList';
import styles from './style.less';

/* eslint react/no-multi-comp:0 */
@connect(({ courseMoney, loading }) => ({
  courseMoney,
  loading: loading.models.rule
}))
class CourseMoney extends Component {
  state = {
    formValues: {}
  };

  columns = [
    {
      title: '课程ID',
      dataIndex: 'id'
    },
    {
      title: '课程名称',
      dataIndex: 'name'
    },
    {
      title: '学期',
      align: 'right',
      dataIndex: 'semester'
    },
    {
      title: '学年',
      align: 'right',
      dataIndex: 'year'
    },
    {
      title: '班级人数',
      align: 'right',
      dataIndex: 'classNum'
    },
    {
      title: '本月收入',
      align: 'right',
      dataIndex: 'income'
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'courseMoney/fetch'
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  };

  render() {
    const {
      courseMoney: { data },
      loading
    } = this.props;
    return (
      <PageHeaderWrapper>
        <AxxMonthPicker></AxxMonthPicker>
        <TableList
          columns={this.columns}
          data={data}
          loading={loading}
          onChange={this.handleStandardTableChange}
        ></TableList>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(CourseMoney);
