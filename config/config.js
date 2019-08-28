import slash from 'slash2';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import theme from './theme';
import webpackPlugin from './plugin.config';

const path = require('path');

const { pwa } = defaultSettings; // TODO: 不知道设置环境是否成功

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production'; // 获取当前的环境 生产还是测试

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true
      },
      locale: {
        // default false
        enable: false,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local'
            }
          }
        : false // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
    }
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true
    }
  ]
];
export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks'
  },
  hash: true,
  targets: {
    ie: 11
  },
  devtool: isProd ? false : 'source-map',
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: '我的课程',
          icon: 'smile',
          component: './Welcome'
        },
        {
          name: '登录',
          path: '/user/login',
          component: './user/login'
        },
        {
          name: 'setting',
          path: '/user/setting',
          component: './user/setting',
          hideInMenu: true
        },
        {
          name: '我的考勤',
          path: '/attendance',
          component: './attendance'
        },
        {
          path: '/courseMoney',
          name: '我的课酬',
          component: './courseMoney'
        },
        {
          component: './404'
        }
      ]
    },
    {
      component: './404'
    }
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,
  // 配置别名
  alias: {
    '@': path.resolve(__dirname, 'src/'),
    '@components': path.resolve(__dirname, '../src/components'),
    '@dump': path.resolve(__dirname, '../src/components/dump/index.js')
  },
  // 定义全局可用的一个变量
  define: {
    NODE_ENV: NODE_ENV || 'development'
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules')
        || context.resourcePath.includes('ant.design.pro.less')
        || context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    }
  },
  manifest: {
    basePath: '/'
  },
  chainWebpack: webpackPlugin
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
