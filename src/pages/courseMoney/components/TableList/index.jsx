import { Table } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';

class TableList extends Component {
  handleTableChange = (pagination, filters, sorter, ...rest) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  render() {
    const { data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};
    const paginationProps = pagination
      ? {
          showQuickJumper: true,
          ...pagination
        }
      : false;
    return (
      <div className={styles.TableListContainer}>
        <Table
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default TableList;
