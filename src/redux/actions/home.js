// import _ from 'lodash';
import { getAction } from './index';
import { TYPE_ADD_TODO, TYPE_GET_REPOSITORIES, TYPE_SET_REPOSITORIES } from '@/redux/types/home';

export default {
  [TYPE_ADD_TODO]: getAction(TYPE_ADD_TODO),
  [TYPE_GET_REPOSITORIES]: getAction(TYPE_GET_REPOSITORIES),
  [TYPE_SET_REPOSITORIES]: getAction(TYPE_SET_REPOSITORIES),
};
