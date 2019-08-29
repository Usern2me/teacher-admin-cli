import React, { Component } from 'react';
import { AxxButton, AxxInput } from '@components/dump';
import { connect } from 'dva';
import styles from './style.less';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Setting extends Component {
  main = undefined;

  render() {
    return (
      <div className={styles.settingContainer}>
        <div className={styles.content}>
          <AxxInput type="text" label="已有密码"></AxxInput>
          <AxxInput showeye label="验证码"></AxxInput>
          <AxxInput search label="设置密码"></AxxInput>
          <AxxInput type="text" label="确认密码"></AxxInput>
          <AxxButton className={styles.btn} size="large" type="primary" block>
            修改密码
          </AxxButton>
        </div>
      </div>
    );
  }
}

export default Setting;
