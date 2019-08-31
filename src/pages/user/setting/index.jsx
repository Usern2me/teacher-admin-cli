import React, { useState, useEffect } from 'react';
import { AxxButton, AxxInput } from '@components/dump';
import { Form } from 'antd';
import { connnet } from 'dva';
import { getCaptcha } from '@/services/user';
import { editPassword } from './service';

import styles from './style.less';

const Setting = props => {
  const {
    form: { getFieldDecorator },
  } = props;
  const [captchaImg, setCaptchaImg] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');

  const getImgData = async () => {
    const response = await getCaptcha();
    setCaptchaImg(response.data.img);
    setCaptchaKey(response.data.verifyKey);
  };

  useEffect(() => {
    getImgData();
  }, []);

  const handleSubmit = () => {
    const { form } = props;
    form.validateFieldsAndScroll((errs, formValue) => {
      if (!errs) {
        let verifyKey = `${formValue.verifyCode}&${captchaKey}`;
        const params = Object.assign(
          {},
          formValue,
          { teacherId: '1234' },
          { verifyCode: verifyKey },
        );
        editPassword(params).then(res => {
          console.log('handleSubmit result--->', res);
        });
      }
    });
  };
  return (
    <div className={styles.settingContainer}>
      <div className={styles.content}>
        {/* 已有密码 */}
        {getFieldDecorator('oldPwd', {
          rules: [{ required: true, message: '请输入已有密码' }],
        })(<AxxInput label="已有密码"></AxxInput>)}
        {/* 验证码 */}
        <div className={styles.captchaBox}>
          {getFieldDecorator('verifyCode', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(<AxxInput customClass={styles.captchaInput} label="验证码"></AxxInput>)}
          <img className={styles.captchaImg} src={captchaImg} alt="验证码" />
        </div>
        {/* 新密码 */}
        {getFieldDecorator('newPwd', {
          rules: [{ required: true, message: '请输入新密码' }],
        })(<AxxInput label="设置密码"></AxxInput>)}
        {/* 二次密码 */}
        {getFieldDecorator('againPwd', {
          rules: [{ required: true, message: '请再次输入密码' }],
        })(<AxxInput label="确认密码"></AxxInput>)}
        <AxxButton className={styles.btn} onClick={handleSubmit} size="large" type="primary" block>
          修改密码
        </AxxButton>
      </div>
    </div>
  );
};

export default Form.create({ name: 'setting' })(Setting);
