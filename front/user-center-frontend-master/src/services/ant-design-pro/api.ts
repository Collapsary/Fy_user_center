// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    credentials: 'include',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/search */
export async function searchUsers(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户修改接口 POST /api/user/update */
export async function updateUser(body: API.UpdateUserParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员更新用户接口 POST /api/user/admin/update */
export async function adminUpdateUser(body: API.AdminUpdateUserParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/admin/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    data: body,
    ...(options || {}),
  });
}

/** 删除用户接口 POST /api/user/delete */
export async function deleteUser(id: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    data: id,
    ...(options || {}),
  });
}

/** 忘记密码接口 POST /api/user/forget-password */
export async function forgetPassword(body: API.ForgetPasswordParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/forget-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



