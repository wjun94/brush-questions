import { ProTable, ProTableProps } from '@ant-design/pro-components';

/** 二次封装ProTable */
const Table = ({
  rowKey = 'id',
  request,
  ...props
}: ProTableProps<any, any>) => {
  return (
    <ProTable
      rowKey={rowKey}
      pagination={{
        pageSize: 10,
      }}
      request={async (newParams, sort, filter) => {
        // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
        // 如果需要转化参数可以在这里进行修改
        let res: any = {
          data: [],
          code: 200,
          totalCount: 0,
        };
        if (request && newParams.pageSize) {
          res = await request(newParams, sort, filter);
        }
        return {
          data: res.data,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: res.code === 200,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: res.totalCount,
        };
      }}
      {...props}
    />
  );
};

export default Table;
