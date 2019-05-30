import { getApi } from '@/services/index';
import { getJson } from '@/utils/request';

import { TYPE_GET_REPOSITORIES } from '@/redux/types/home';

export default {
  [TYPE_GET_REPOSITORIES]: getApi(getJson, 'https://github-trending-api.now.sh/repositories'),
};
