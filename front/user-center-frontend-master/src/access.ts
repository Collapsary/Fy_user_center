/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    // 管理员权限：只有userRole为1的用户才能管理其他用户
    canAdmin: currentUser && currentUser.userRole === 1,
    // 普通用户权限：所有登录用户都可以访问管理页面
    canUser: !!currentUser,
  };
}
