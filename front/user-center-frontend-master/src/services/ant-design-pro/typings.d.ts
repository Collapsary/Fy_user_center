// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender:number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    createTime: Date;
  };

  type LoginResult = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    createTime: Date;
  };

  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };


  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code: number,
    data: T,
    msg: string,
  }


  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    planetCode?: string;
    type?: string;
  };

  type UpdateUserParams = {
    username?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    planetCode?: string;
  };

  type AdminUpdateUserParams = {
    id: number;
    username?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    planetCode?: string;
    userRole?: number;
  };

  type ForgetPasswordParams = {
    userAccount?: string;
    phone?: string;
    email?: string;
    newPassword?: string;
    checkPassword?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

}
