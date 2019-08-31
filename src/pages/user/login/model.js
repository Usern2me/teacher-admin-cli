import { routerRedux } from 'dva/router';
import { Storage } from '@utils/utils';
import { userLogin } from './service';
import { getCaptcha } from '@/services/user';
import { getPageQuery, setAuthority } from './utils/utils';

const Model = {
  namespace: 'userLogin',
  state: {
    status: undefined,
    wrongTime: 0
  },
  effects: {
    * login({ payload }, { select, call, put }) {
      const { wrongTime, verifyKey } = select(state => state);
      if (wrongTime) {
        // 错误一次要传验证码
        Object.assign(payload, { verifyCode: verifyKey });
      }
      console.log('verify', payload);
      const response = yield call(userLogin, payload);

      if (response && response.code && response.code === 'SUCCESS') {
        yield put({
          type: 'setToken',
          payload: response.data.token
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        // 有redirect参数代表需要重定向
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        yield put({
          type: 'saveWrongTime'
        });
        yield put({
          type: 'getCaptcha'
        });
      }
    },
    * getCaptcha(_, { call, put }) {
      const response = yield call(getCaptcha);
      if (response && response.code && response.code === 'SUCCESS') {
        yield put({
          type: 'saveState',
          payload: response.data
        });
      }
      return response;
    },
    setToken({ payload }) {
      Storage.set('token', payload);
    },
    removeToken(payload) {
      Storage.remove('token', payload);
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    saveWrongTime(state) {
      const { wrongTime } = state;
      return { ...state, wrongTime: wrongTime + 1 };
    },
    saveState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
export default Model;
