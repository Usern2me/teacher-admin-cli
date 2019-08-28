import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { AxxButton, AxxInput } from '@dump';

import styles from './style.less';

@connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects['userLogin/login']
}))
class Login extends Component {
  state = {
    type: 'account'
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { form } = this.props;
    form.validateFieldsAndScroll((errs, formValue) => {
      if (!errs) {
        console.log('Received formValue of form: ', formValue);
      } else {
        console.log('有错误--->', errs);
      }
    });
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: { ...values, type }
      });
    }
  };

  handleAxxInputChange = e => {
    console.log('eee', e);
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <div className={styles.loginContainer}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(<AxxInput type="text" label="用户名"></AxxInput>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码'
              }
            ]
          })(
            <AxxInput
              onChange={this.handleAxxInputChange}
              type="password"
              showpasswordeye="true"
              label="密码"
            ></AxxInput>,
          )}
        </Form.Item>
        <AxxButton
          className={styles.loginBtn}
          onClick={this.handleSubmit}
          size="large"
          block
          type="primary"
        >
          登录
        </AxxButton>
      </div>
    );
  }
}

export default Form.create({ name: 'login' })(Login);
