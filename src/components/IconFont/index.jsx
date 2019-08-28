import { Icon } from 'antd';
import defaultConfig from '../../../config/defaultSettings';

const { iconfontUrl } = defaultConfig;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconfontUrl
});

export default IconFont;
