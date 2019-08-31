/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 * TODO:
 * 1. 添加token支持,回退login页
 * 2. token过期处理
 * 3. 权限路由支持
 */

import router from 'umi/router';
import { extend } from 'umi-request';
import { notification } from 'antd';
import { Storage } from '@utils/utils';

import API_HOST from '../../config/apiHost';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  501: '服务未实现',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  505: 'HTTP版本不受支持',
};

/**
 * 异常处理程序,http有错误进入这里(status!=2xx)
 */
const errorHandler = error => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
    console.log('err handle', error);
    return error;
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */
const request = extend({
  maxCache: 10, // 最大缓存个数, 超出后会自动清掉按时间最开始的一个.
  prefix: '/teacherApi', // 教师端前缀
  errorHandler,
  timeout: 5000,
  // 默认错误处理
});

// request 拦截器，增加不同环境的地址，添加token
request.interceptors.request.use((url, options) => {
  const token = Storage.get('token');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  return Object.assign({}, { url: `${API_HOST.BASEURL}${url}`, options: { ...options } });
});

// response拦截器
request.interceptors.response.use(response => response);

// 中间件，可以对请求前、响应后做处理
// 这里对token和重定向进行处理
request.use(async (ctx, next) => {
  // 响应前
  await next();
  // 响应后
  const {
    res: { code },
  } = ctx;
  if (code === 'UNAUTHC' || code === 'EXPIRE' || code === 'EXCEPTION') {
    // 对异常情况做对应处理
    Storage.remove('token');
    setTimeout(() => {
      router.replace('/attendance');
    }, 500);
  }
  return ctx;
});

export default request;
