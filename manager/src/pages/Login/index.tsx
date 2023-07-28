/**
 * 文档作者: wjun94
 * 创建时间：2019年10月27日
 * 修改时间：2019年10月27日
 * 描述信息：登录
 */
import { Flex } from '@/components';
import { login } from '@/services/user';
import { setCookie } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input } from 'antd';
import './index.less';
import LeftPng from './left.png';

const Login = () => {
  const { refresh } = useModel('@@initialState');
  const handleSubmit = async (values: any) => {
    const { data } = await login(values);
    setCookie('userToken', data);
    refresh();
    history.push('/home');
  };
  return (
    <Flex align="center" justify="center" className="login-page">
      <Flex align="center" className="main">
        <img src={LeftPng} />
        <div className="right">
          <div className="header">
            <h2>刷题后台</h2>
            <p className="desc">一款专门做前端刷题的平台</p>
          </div>

          <Form onFinish={handleSubmit}>
            <Form.Item
              name="mobile"
              rules={[{ required: true, message: '请输入手机号' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="手机号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
          <p className="footer">Brush Questions ©2023 Created by Hangzhou</p>
        </div>
      </Flex>
    </Flex>
  );
};

export default Login;
