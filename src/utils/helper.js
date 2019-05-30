import _ from 'lodash';

export function isServer() {
  return typeof window === 'undefined';
}

export function getToken() {
  return '';
}

export function getLocale() {
  return 'zh-CN';
}

export function hasString(str) {
  return _.isString(str) && !_.isEmpty(str);
}

export function hasArray(arr) {
  return _.isArray(arr) && !_.isEmpty(arr);
}

export function hasPlainObject(obj) {
  return _.isPlainObject(obj) && !_.isEmpty(obj);
}

export function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const { pathname, asPath, query } = router;
  return {
    get query() {
      return query;
    },
    get pathname() {
      return pathname;
    },
    get asPath() {
      return asPath;
    },
    back: () => {
      router.back();
    },
    push: (url, as) => {
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      const pushRoute = as ? href : '';
      const pushUrl = as || href;

      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;

      return router.replace(replaceRoute, replaceUrl);
    },
  };
}
