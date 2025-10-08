package com.fy.usercenter.model.request;

import lombok.Data;

import java.io.Serializable;

/**
 * 忘记密码请求
 *
 * @author fy
 */
@Data
public class ForgetPasswordRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户账号
     */
    private String userAccount;

    /**
     * 电话
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 新密码
     */
    private String newPassword;

    /**
     * 确认新密码
     */
    private String checkPassword;
}

