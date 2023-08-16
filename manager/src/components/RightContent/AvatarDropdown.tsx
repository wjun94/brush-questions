import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from '@umijs/max';
import { stringify } from 'querystring';
import { loginout } from '@/services/user';
import { removeCookie } from '@/utils';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.less';
import querystring from 'query-string';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await loginout();
  removeCookie('userToken');
  const { search } = history.location;
  const query = querystring.parse(search);
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: window.location.pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'loginout' && initialState) {
        setInitialState(undefined);
        loginOut();
        return;
      }
      history.push(`/settings/${key}`);
    },
    [initialState, setInitialState]
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  if (!initialState || !initialState.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick as any}
    >
      <Menu.Item key="base">
        <UserOutlined />
        基本信息
      </Menu.Item>
      <Menu.Item key="safety">
        <SettingOutlined />
        安全设置
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="loginout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{initialState?.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
