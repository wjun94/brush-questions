// mock tableListDataSource
import { getList } from './method';

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

export default {
  'GET /api/v1/category/list': getList(genList(1, 100)),
}