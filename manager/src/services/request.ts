// @ts-ignore
/* eslint-disable */
import { getCookie } from '@/utils';
import { history } from '@umijs/max';
import { request } from '@umijs/max';
import { message } from 'antd';

let timeout: any;

function generateRequest(prefix: string) {
  return async function <T>(
    url: string,
    options?: { [key: string]: any },
    isToast = true
  ) {
    return await request<API.Response<T> | API.ResponseLise<T>>(prefix + url, {
      ...options,
      headers: {
        Authorization: getCookie('userToken'),
      } as any,
    })
      .then((res: API.Response<T>) => {
        if (
          isToast &&
          !/list/.test(url) &&
          options &&
          options.method !== 'GET'
        ) {
          if (res.code !== 200) {
            // message.error(res.msg);
            return Promise.reject(res);
          } else {
            message.success(res.msg);
          }
        }
        return res;
      })
      .catch((err: any) => {
        console.log(err);
        const errMsg =
          err?.response?.data?.error ||
          err?.response?.data?.msg ||
          err?.error ||
          err?.msg ||
          err?.response?.statusText;
        if (err?.response?.status === 401) {
          history.push('/login');
        }
        // if (isToast) {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => message.error(errMsg), 100);
        // }
        return Promise.reject({
          msg: '服务端异常',
          error: errMsg,
          code: 500,
          data: null as any,
        });
      });
  };
}

export default generateRequest(process.env.PREFIX as string);
