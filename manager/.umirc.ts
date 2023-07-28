import { defineConfig } from '@umijs/max';
import routes from './config/routes';

const { NODE_ENV } = process.env;

export default defineConfig({
  define: {
    'process.env.PREFIX': process.env.PREFIX,
    'process.env.CDN': process.env.CDN,
    'process.env.FILENAME':
      NODE_ENV === 'development'
        ? process.env.DEVFILENAME
        : process.env.FILENAME,
  },
  // 快速刷新
  fastRefresh: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  npmClient: 'pnpm',
});

