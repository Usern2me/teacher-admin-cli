/**
 * 根据命令行输入的参数选择不同的api环境
 */
let logStore;
let sccBaseURL;
let BASEURL;
let lmcBaseURL;
let imBaseURL;
const BASEPATH = '/api/';

// 测试地址
switch (process.env.NODE_ENV) {
  case 'development': // 开发模式
    BASEURL = 'http://axxol-teacher-api.aixuexi.com';
    sccBaseURL = 'https://axxol-scc.aixuexi.com';
    lmcBaseURL = 'https://lmc.online-test.teacherv.top/';
    imBaseURL = 'https://axxol-im.aixuexi.com/imApi';
    logStore = 'client-palyer-log-monitor-logstore-test';
    break;
  case 'mock': // mock模式
    BASEURL = 'http://localhost:8080';
    sccBaseURL = 'https://axxol-scc.aixuexi.com';
    lmcBaseURL = 'https://lmc.online-test.teacherv.top/';
    imBaseURL = 'https://axxol-im.aixuexi.com/imApi';
    logStore = 'client-palyer-log-monitor-logstore-test';
    break;
  case 'production': // 生产模式
    BASEURL = 'https://api3.91haoke.com';
    sccBaseURL = 'https://scc3.91haoke.com';
    lmcBaseURL = 'https://lmc.91haoke.com/';
    imBaseURL = 'https://im.91haoke.com/imApi';
    logStore = 'client-palyer-log-monitor-logstore';
    break;
  default:
    break;
}

export default {
  sccBaseURL,
  BASEURL,
  lmcBaseURL,
  imBaseURL,
  logStore,
  BASEPATH,
};
