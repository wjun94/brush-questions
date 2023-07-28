// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}
/**
 * 默认时间30天
 * @param {*} key
 * @param {*} value
 */
export function setCookie(key: string, value: any, day = 30) {
  const exp: any = new Date();
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${encodeURI(value)};expires=${exp.toGMTString()}`;
}

/**
 * 获取cookie
 * @param {*} key
 */
export function getCookie(key: string) {
  let arr;
  const target = new RegExp(`(^| )${key}=([^;]*)(;|$)`); // 正则匹配
  /* eslint-disable no-cond-assign */
  if ((arr = document.cookie.match(target))) {
    return encodeURIComponent(arr[2]);
  }
  return null;
}

/**
 * 删除cookie
 */
export function removeCookie(key: string) {
  document.cookie = `${key}=;expires=${new Date(0)}`;
}
