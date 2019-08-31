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
import StandardTable from './components/StandardTable';
import { AxxCalendar } from '@dump';
import styles from './style.less';

const getValue = obj => Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ attendance, loading }) => ({
  attendance,
  loading: loading.models.rule
}))
class Attendance extends Component {
  state = {
    selectedRows: [],
    formValues: {}
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'courseId'
    },
    {
      title: '课程名称',
      dataIndex: 'courseName'
    },
    {
      title: '课次名称',
      dataIndex: 'knowledgeName'
    },
    {
      title: '课程时间',
      dataIndex: 'knowledgeTime'
    },
    {
      title: '签到时间',
      dataIndex: 'attendanceTime'
    },
    {
      title: '补签',
      dataIndex: 'isRepair'
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'attendance/fetch',
      payload: {
        endTime: '2019-07-29T07:53:49.873Z',
        startTime: '2019-08-29T07:53:49.873Z',
        teacherId: 12267
      }
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

    dispatch({
      type: 'attendance/fetch',
      payload: params
    });
  };

  render() {
    const {
      attendance: { data },
      loading
    } = this.props;

    return (
      <PageHeaderWrapper>
        <AxxCalendar />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Attendance);
