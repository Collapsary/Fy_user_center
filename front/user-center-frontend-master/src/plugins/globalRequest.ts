/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";
import {history} from "@@/core/history";
import {stringify} from "querystring";

/**
 * 配置request请求时的默认参数
 */
// 动态获取后端API地址
const getApiPrefix = () => {
  if (process.env.NODE_ENV === 'production') {
    // 生产环境：使用环境变量或默认的后端URL
    return process.env.REACT_APP_API_URL || 'https://fy-user-center-production-0b98.up.railway.app';
  }
  // 开发环境
  return 'http://localhost:8080';
};

const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: getApiPrefix(),
  timeout: 10000,
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`)

  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 1) {
    return res;
  }
  if (res.code === 40100) {
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else {
    message.error(res.msg || res.description || '请求失败')
  }
  return res;
});

export default request;
