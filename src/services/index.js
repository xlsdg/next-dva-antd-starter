export function getApi(fn, url) {
  return (...args) => fn(url, ...args);
}
