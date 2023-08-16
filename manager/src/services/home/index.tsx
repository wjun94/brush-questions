import request from '@/services/request';

/** 订单列表 */
export function getCategoryList(params: API.PageParams) {
  return request<CATEGORY.Item[]>('/category/list', {
    method: 'GET',
    params,
  });
}