export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './user/Login'},
      {name: '注册', path: '/user/register', component: './user/Register'},
      {name: '修改信息', path: '/user/update', component: './user/Update'},
      {name: '忘记密码', path: '/user/forget-password', component: './user/ForgetPassword'},
      {component: './404'},
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canUser',
    component: './Admin',
    routes: [
      {path: '/admin/user-manage', name: '用户管理', icon: 'smile', component: './Admin/UserManage', access: 'canUser'},
      {component: './404'},
    ],
  },
  {path: '/', redirect: '/user/login'},
  {component: './404'},
];
