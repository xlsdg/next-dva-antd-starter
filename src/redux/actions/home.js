// import _ from 'lodash';
import { getAction } from './index';
import { TYPE_ADD_TODO } from '@/redux/types/home';

export default {
  [TYPE_ADD_TODO]: getAction(TYPE_ADD_TODO),
};
