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
    path: '/question',
    name: '分类',
    routes: [
      { path: '/question', redirect: '/question/list' },
      {
        path: '/question/list',
        name: '分类列表',
        component: './Question/List',
      },
      {
        path: '/question/detail',
        hideInMenu: true,
        name: '分类详情',
        component: './Question/Detail',
      },
    ],
  },
]