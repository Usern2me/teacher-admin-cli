import { Button } from 'antd';
import React from 'react';

import styles from './index.less';

const AxxButton = props => {
  const { children } = props;
  return (
    <Button className={styles.axx_button} {...props}>
      {children}
    </Button>
  );
};

export default AxxButton;
