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
import MonthList from './components/MonthList';
import styles from './style.less';

const getValue = obj => Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

/* eslint react/no-multi-comp:0 */
@connect(({ attendance, loading }) => ({
  attendance,
  loading: loading.models.rule
}))
class Attendance extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {}
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'name'
    },
    {
      title: '课次名称',
      dataIndex: 'desc'
    },
    {
      title: '课程时间',
      align: 'right',
      dataIndex: 'owner'
    },
    {
      title: '签到时间',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: '0'
        },
        {
          text: status[1],
          value: '1'
        },
        {
          text: status[2],
          value: '2'
        },
        {
          text: status[3],
          value: '3'
        }
      ],

      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      }
    },
    {
      title: '补签',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'attendance/fetch'
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
    const {
 selectedRows, modalVisible, updateModalVisible, stepFormValues
} = this.state;

    return (
      <PageHeaderWrapper>
        <MonthList/>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Attendance);
