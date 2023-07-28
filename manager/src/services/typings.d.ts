/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
declare namespace API {
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type Response<T> = {
    code: number; // 错误码
    msg: string; // 错误信息
    error?: string; // 错误信息
    data: T;
  };

  type ResponseLise<T> = {
    total: number;
  } & Response<T> &
    PageParams;

  type ById = {
    id: number | string;
  };
}
