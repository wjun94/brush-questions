import request from '@/services/request';

/** 标签列表 */
export function getCategoryList(params: API.PageParams) {
  return request<CATEGORY.Item[]>('/category/list', {
    method: 'GET',
    params,
  });
}

/** 创建标签 */
export function createCategory(data: CATEGORY.Create) {
  return request<CATEGORY.Item[]>('/category', {
    method: 'POST',
    data,
  });
}

/** 创建标签 */
export function updateCategory(data: CATEGORY.Item) {
  return request<CATEGORY.Item[]>('/category', {
    method: 'PUT',
    data,
  });
}
