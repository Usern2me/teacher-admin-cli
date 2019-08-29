import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { AxxButton, AxxInput } from '@dump';

import styles from './style.less';

@connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects['userLogin/login'],
}))
class Login extends Component {
  handleSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((errs, formValue) => {
      if (!errs) {
        dispatch({
          type: 'userLogin/login',
          payload: formValue,
        });
      }
    });
  };

  handleChangeCaptcha = () => {
    const { dispatch } = this.props;
    const result = dispatch({
      type: 'userLogin/getCaptcha',
    });
    console.log('result', result);
  };

  render() {
    const {
      form: { getFieldDecorator },
      userLogin: { wrongTime, img },
    } = this.props;

    return (
      <div className={styles.loginContainer}>
        <Row>
          <Col span={10} offset={2}>
            <img src={require('@assets/login_bg.png')} alt="登录背景占位图" />
          </Col>
          <Col span={8} offset={2}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(<AxxInput autoComplete="off" type="text" label="用户名"></AxxInput>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(
                <AxxInput
                  onChange={this.handleAxxInputChange}
                  type="password"
                  showpasswordeye="true"
                  label="密码"
                ></AxxInput>,
              )}
            </Form.Item>
            {wrongTime > 0 && (
              <Form.Item onClick={this.handleChangeCaptcha}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ],
                })(<AxxInput autoComplete="off" label="验证码"></AxxInput>)}
                {wrongTime > 0 && <img className={styles.captcheImg} src={img} alt="code" />}
              </Form.Item>
            )}
            <AxxButton
              className={styles.loginBtn}
              onClick={this.handleSubmit}
              size="large"
              block
              type="primary"
            >
              登录
            </AxxButton>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: 'login' })(Login);
