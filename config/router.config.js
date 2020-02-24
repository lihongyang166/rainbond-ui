export default [
  {
    path: '/oauth',
    component: '../layouts/OauthLayout',
    routes: [
      // 第三方认证
      { path: '/oauth/callback', component: './User/Third' },
    ],
  },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      // 登录
      { path: '/user/login', component: './User/Login' },
      // 注册
      { path: '/user/register', component: './User/Register' },
      // 注册
      { path: '/user/register-result', component: './User/RegisterResult' },
      // 第三方登录
      { path: '/user/third/login', component: './User/ThirdLogin' },
      // 第三方注册
      { path: '/user/third/register', component: './User/ThirdRegister' },
    ],
  },
  {
    path: '/exception/trigger',
    component: './Exception/triggerException',
  },
  // main route config
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    authority: ['admin', 'user'],
    routes: [
      // enterprise view layout
      {
        path: '/',
        redirect: '/enterprise/auto',
      },
      {
        path: '/enterprise/:eid',
        component: '../layouts/EnterpriseLayout',
        name: 'EnterprisePage',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/enterprise/:eid/index',
            component: './Enterprise',
            name: 'enterpriseOverview',
            authority: ['admin', 'user'],
          },
          {
            path: '/enterprise/:eid/teams',
            component: './EnterpriseTeams',
            name: 'EnterpriseTeams',
            authority: ['admin', 'user'],
          },
          {
            path: '/enterprise/:eid/setting',
            component: './EnterpriseSetting',
            name: 'EnterpriseSetting',
            authority: ['admin', 'user'],
          },
          {
            path: '/enterprise/:eid/shared',
            component: './EnterpriseShared',
            name: 'EnterpriseShared',
            authority: ['admin', 'user'],
          },
          {
            path: '/enterprise/:eid/shared/cloudMarket',
            component: './EnterpriseCloudMarket',
            name: 'EnterpriseCloudMarket',
            authority: ['admin', 'user'],
          },
        ],
      },
      // team view layout
      {
        path: '/team/:teamName/region/:regionName/',
        component: '../layouts/TeamLayout',
        name: 'TeamBasicLayout',
        authority: ['admin', 'user'],
        routes: [
          // 总览
          {
            path: '/team/:teamName/region/:regionName/index',
            component: './TeamDashboard/Index',
            name: 'teamOverview',
            authority: ['admin', 'user'],
          },
          {
            path: '/team/:teamName/region/:regionName/source/:type?/:name?',
            component: './Source/Index',
            name: 'Source',
            authority: ['admin', 'user'],
          },
          {
            path: '/team/:teamName/region/:regionName/finance',
            component: './Finance',
            name: 'Finance',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/message',
            component: './Message/Index',
            name: 'Message',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/allbackup',
            component: './Group/AllBackup',
            name: 'AllBackup',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/team',
            component: './Team',
            name: 'Team',
            authority: ['admin', 'user'],
          },
          {
            path: '/team/:teamName/region/:regionName/apps',
            component: './AppList',
            name: 'appList',
            authority: ['admin', 'user'],
            title: '应用列表',
          },
          {
            path: '/team/:teamName/region/:regionName/apps/:appID/upgrade',
            component: './Upgrade',
            name: 'Upgrade',
            authority: ['admin', 'user'],
            title: '云市应用升级',
          },

          {
            path: '/team/:teamName/region/:regionName/apps/:appID/backup',
            component: './Group/Backup',
            name: 'Backup',
            authority: ['admin', 'user'],
            title: '备份管理',
          },

          {
            path: '/team/:teamName/region/:regionName/apps/:appID/publish',
            component: './Group/Publish',
            name: 'publish',
            authority: ['admin', 'user'],
            title: '发布管理',
          },

          {
            path: '/team/:teamName/region/:regionName/apps/:appID/gateway',
            component: './Group/Gateway',
            name: 'publish',
            authority: ['admin', 'user'],
            title: '应用网关',
          },

          {
            path: '/team/:teamName/region/:regionName/apps/:appID',
            component: './Group/Index',
            name: 'Groups',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/groups/share/one/:groupId/:shareId',
            component: './Group/AppShare',
            name: 'AppShares',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/groups/share/two/:groupId/:shareId',
            component: './Group/AppShareLoading',
            name: 'AppShareLoading',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/groups/share/three/:groupId:ShareId',
            component: './Group/AppShareFinish',
            name: 'AppShareFinish',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/components/:appAlias/:type?',
            component: './Component',
            name: 'Component',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/code/:type?/:code?',
            component: './Create/code',
            name: 'code',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/outer/:type?/:outer?',
            component: './Create/outer',
            name: 'outer',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/create/market/:keyword?',
            component: './Create/market',
            name: 'market',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/myplugns/:pluginId?',
            component: './Plugin',
            name: 'Plugin',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/shareplugin/step-one/:pluginId/:shareId',
            component: './Plugin/share-stepone',
            name: 'stepone',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/shareplugin/step-two/:pluginId/:shareId',
            component: './Plugin/share-steptwo',
            name: 'steptwo',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/create-plugin',
            component: './Plugin/Create',
            name: 'plugin',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/create-check/:appAlias',
            component: './Create/create-check',
            name: 'check',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/create-compose-check/:groupId/:composeId',
            component: './Create/create-compose-check',
            name: 'compose',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/image/:type?/:image?',
            component: './Create/image',
            name: 'imagesss',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/create-setting/:appAlias',
            component: './Create/create-setting',
            name: 'setting',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/create-moreService/:appAlias/:check_uuid',
            component: './Create/create-moreService',
            name: 'moreService',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/guide',
            component: './Guide/index',
            name: 'setting',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/create/create-compose-setting/:groupId/:composeId',
            component: './Create/create-compose-setting',
            name: 'compose',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/result/success',
            component: './Result/Success',
            name: 'Success',
            authority: ['admin', 'user'],
          },
          {
            path: '/result/fail',
            component: './Result/Error',
            name: 'Error',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/exception/403',
            component: './Exception/403',
            name: '403',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/exception/404',
            component: './Exception/404',
            name: '404',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/exception/500',
            component: './Exception/500',
            name: '500',
            authority: ['admin', 'user'],
          },

          {
            path:
              '/team/:teamName/region/:regionName/gateway/control/:types?/:isopen?',
            component: './GateWay/control',
            name: 'control',
            authority: ['admin', 'user'],
          },

          {
            path: '/team/:teamName/region/:regionName/gateway/license',
            component: './GateWay/license',
            name: 'license',
            authority: ['admin', 'user'],
          },
        ],
      },
    ],
  },
];
