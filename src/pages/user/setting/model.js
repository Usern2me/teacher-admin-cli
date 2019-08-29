import { editPassword } from './service';

const Model = {
  namespace: 'userSetting',
  state: {
    currentUser: {},
    isLoading: false,
  },
  effects: {
    *sendNewPwd(_, { call, put }) {
      const response = yield call(editPassword);
      yield put({
        type: 'saveState',
        payload: response,
      });
    },
  },
  reducers: {
    saveState(state, action) {
      return { ...state, province: action.payload };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
