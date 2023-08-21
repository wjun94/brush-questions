// mock tableListDataSource
import { getList, success } from './method';

const genList = (current: number, pageSize: number) => {
  const tableListDataSource: CATEGORY.Item[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: String(index),
      title: '分类' + index,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

const tagList = (current: number, pageSize: number) => {
  const tableListDataSource: TAG.Item[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: String(index),
      title: '标题' + index,
      answer: '答案' + index,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

export default {
  'GET /api/v1/category/list': getList(genList(1, 100)),
  'GET /api/v1/tag/list': getList(tagList(1, 100)),
  'POST /api/v1/category': success,
  'PUT /api/v1/category': success,
  'POST /api/v1/tag': success,
  'PUT /api/v1/tag': success,
  'DELETE /api/v1/category': success,
  'DELETE /api/v1/tag': success,
}