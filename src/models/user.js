import { queryCurrent } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {}
  },
  effects: {
    * fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        phone: '0752-268888888'
      };
      yield put({
        type: 'saveCurrentUser',
        payload: response
      });
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {}
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
export default UserModel;
