import _ from 'lodash';

import { NS_HOME } from '@/redux/namespaces/index';
import { TYPE_ADD_TODO, TYPE_GET_REPOSITORIES, TYPE_SET_REPOSITORIES } from '@/redux/types/home';
import Action from '@/redux/actions/home';

import Api from '@/services/home';

const initialState = {
  todo: [],
  repositories: [],
};

export default {
  namespace: NS_HOME,
  state: _.cloneDeep(initialState),
  subscriptions: {},
  effects: {
    *[TYPE_GET_REPOSITORIES]({ payload }, { put, call, select }) {
      const options = {
        useBaseRequest: false,
        addLocale: false,
        checkCode: false,
      };

      const resp = yield call(Api[TYPE_GET_REPOSITORIES], payload, options);
      yield put(Action[TYPE_SET_REPOSITORIES]({ repositories: resp }));
    },
  },
  reducers: {
    [TYPE_ADD_TODO](state, { payload }) {
      state.todo.push(...payload.todo);
    },
    [TYPE_SET_REPOSITORIES](state, { payload }) {
      state.repositories = payload.repositories;
    },
  },
};
