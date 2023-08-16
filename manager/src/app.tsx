import { current } from '@/services/user';
import { RunTimeLayoutConfig } from '@umijs/max';
import { RightContent } from '@/components';
import './css/antd.less';
import './css/app.less';


// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<USER.UserInfo> {
  const { data: userInfo } = await current();
  return userInfo;
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: '/assets/favicon.png',
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.name,
    },
    layout: 'mix',
    headerTheme: 'dark',
    navTheme: 'light',
    splitMenus: true,
    /** 导航颜色参考以下文档
     * https://next-procomponents.ant.design/components/layout/#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
     */
    token: {
      sider: {
        // menuBackgroundColor: '#004FD9',
      },
    },
    menu: {
      locale: false,
    },
  };
};
