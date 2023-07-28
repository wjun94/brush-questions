import { format } from 'date-fns';
import { parse } from 'url';

// 请求成功
export const success = (_: any, res: any) => {
  res.send({
    code: 200,
    data: null,
    msg: '操作成功',
  });
};

export const detail = (data: any) => {
  return (_: any, res: any) => {
    res.send({
      code: 200,
      data,
      msg: '操作成功',
    });
  };
};

export const error = (code: number) => {
  return (_: any, res: any) => {
    res.status(500).send({
      msg: '服务端异常',
      data: null,
      code,
    });
  };
};

// 分页列表
export function getList(data: any) {
  return function applyList(req: any, res: any, u: string) {
    let realUrl = u;
    if (
      !realUrl ||
      Object.prototype.toString.call(realUrl) !== '[object String]'
    ) {
      realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params: any = parse(realUrl, true)
      .query as unknown as API.PageParams & {
        sorter: any;
        filter: any;
      };

    let dataSource = [...data]
      .slice(
        ((current as number) - 1) * (pageSize as number),
        (current as number) * (pageSize as number)
      )
      .map((item) => ({
        ...item,
        createdAt: format(new Date, 'YYYY-MM-DD'),
        updatedAt: format(new Date, 'YYYY-MM-DD'),
      }));
    const sorter = JSON.parse(params.sorter || ('{}' as any));
    if (sorter) {
      dataSource = dataSource.sort((prev, next) => {
        let sortNumber = 0;
        Object.keys(sorter).forEach((key) => {
          if (sorter[key] === 'descend') {
            if (prev[key] - next[key] > 0) {
              sortNumber += -1;
            } else {
              sortNumber += 1;
            }
            return;
          }
          if (prev[key] - next[key] > 0) {
            sortNumber += 1;
          } else {
            sortNumber += -1;
          }
        });
        return sortNumber;
      });
    }
    if (params.filter) {
      const filter = JSON.parse(params.filter as any) as {
        [key: string]: string[];
      };
      if (Object.keys(filter).length > 0) {
        dataSource = dataSource.filter((item) => {
          return Object.keys(filter).some((key) => {
            if (!filter[key]) {
              return true;
            }
            if (filter[key].includes(`${item[key]}`)) {
              return true;
            }
            return false;
          });
        });
      }
    }

    if (params.name) {
      dataSource = dataSource.filter((data) =>
        data?.name?.includes(params.name || '')
      );
    }
    const result = {
      data: dataSource,
      total: data.length,
      code: 200,
      pageSize,
      current: parseInt(`${params.current}`, 10) || 1,
    };

    return res.json(result);
  };
}
