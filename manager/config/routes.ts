export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '登录',
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '详情',
    hideInMenu: true,
    path: '/detail',
    component: './Home/Detail',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  },
]