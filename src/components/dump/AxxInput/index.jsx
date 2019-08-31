/**
 * AXXInput:
 *  属性：
 *  labelValue:xxx,
 *  customClass:xxx,// 设置在最外层的class
 *  type:['text','textarea','password','search]
 */
import React, { forwardRef } from 'react';
import { Input } from 'antd';
import styles from './index.less';

const { Password, Search } = Input;

const AxxInput = (props, ref) => {
  const { children, label, showeye, search, customClass } = props;

  const handleDivChange = e => {
    if (showeye || search) {
      const labelClassList = e.target.parentElement.nextSibling.classList;
      if (e.target.value !== '') {
        labelClassList.add('label-transition');
      } else {
        labelClassList.remove('label-transition');
      }
    }
  };

  return (
    <div
      onChange={handleDivChange}
      ref={ref}
      className={`${styles['override-ant-btn']} ${customClass}`}
    >
      {showeye ? (
        <Password autoComplete="off" required {...props}>
          {children}
        </Password>
      ) : search ? (
        <Search autoComplete="off" required {...props}>
          {children}
        </Search>
      ) : (
        <Input autoComplete="off" required {...props}>
          {children}
        </Input>
      )}
      {label ? <span className={styles['ant-btn-label']}>{label}</span> : null}
    </div>
  );
};

// tips:没有这个封装会报错
export default forwardRef(AxxInput);
