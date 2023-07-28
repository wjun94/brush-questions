import { detail, success } from './method';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /api/v1/current': detail({
    id: 13974838,
    mobile: '135****7127',
    email: '994037717@qq.com',
    name: '测试账号',
    role: 0,
  }),
  'DELETE /api/v1/loginout': success,
  'POST /api/v1/login': async (req: any, res: any) => {
    const { password, mobile } = req.body;
    await waitTime(500);
    if (password === '123456' && mobile === '13588227124') {
      res.send({
        code: 200,
        data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEzMDI4NDk5LCJyb2xlIjoxLCJhY2Nlc3Npb24iOltdLCJleHAiOjE2MzE5MzEzMzAsImlhdCI6MTYzMDYzNTMzMCwiaXNzIjoieHdqIn0.oJtZr3vE4GgbuAdyiTZtn7GJWY_suEwaBmr6MbcIv1A',
        msg: 'success',
      });
      return;
    } else {
      res.status(500).send({
        msg: '帐号密码错误',
        data: null,
        code: 500,
      });
      return;
    }
  },
};
