import request from '@/services/request';

/** 标签列表 */
export function getCategoryList(params: API.PageParams) {
  return request<CATEGORY.Item[]>('/category/list', {
    method: 'GET',
    params,
  });
}

/** 标签列表 */
export function getTagList(params: API.PageParams) {
  return request<TAG.Item[]>('/tag/list', {
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

/** 更新标签 */
export function updateCategory(data: CATEGORY.Item) {
  return request<string>('/category', {
    method: 'PUT',
    data,
  });
}

/** 创建标签 */
export function createTag(data: TAG.Create) {
  return request<CATEGORY.Item[]>('/tag', {
    method: 'POST',
    data,
  });
}

/** 更新标签 */
export function updateTag(data: TAG.Item) {
  return request<string>('/tag', {
    method: 'PUT',
    data,
  });
}

/** 删除标签 */
export function deleteCategory(data: API.ById) {
  return request<string>('/category', {
    method: 'DELETE',
    data,
  });
}

/** 删除标签 */
export function deleteTag(data: API.ById) {
  return request<string>('/tag', {
    method: 'DELETE',
    data,
  });
}
