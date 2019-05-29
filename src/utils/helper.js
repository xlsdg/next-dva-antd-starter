import _ from 'lodash';

export function isServer() {
  return typeof window === 'undefined';
}

export function getToken() {
  return '';
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
