import _ from 'lodash';

import { NS_HOME } from '@/redux/namespaces/index';
import { TYPE_ADD_TODO } from '@/redux/types/home';

const initialState = {
  todo: [],
};

export default {
  namespace: NS_HOME,
  state: _.cloneDeep(initialState),
  subscriptions: {},
  effects: {},
  reducers: {
    [TYPE_ADD_TODO](state, { payload }) {
      state.todo.push(payload.todo);
    },
  },
};
