/**
 * AXXInput:
 *  属性：
 *  labelValue:xxx,
 *  type:['text','password','textarea']
 */
import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import IconFont from '@components/IconFont';

import styles from './index.less';

// TODO:
// 1. 重点解决封装了一层监听不到onChange事件的问题
// 2. 封装密码input组件

const AxxInput = props => {
  const { children, label } = props;
  const [text, setText] = useState('aaa');
  const inputRef = useRef('aaa');
  useEffect(() => {
    console.log('aaa', inputRef.current.state);
  }, [inputRef]);
  return (
    <div className={styles['override-ant-btn']}>
      <Input value={text} ref={inputRef} required {...props}>
        {children}
      </Input>
      {label ? <span className={styles['ant-btn-label']}>{label}</span> : null}
    </div>
  );
};

export default AxxInput;
