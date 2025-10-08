package com.fy.usercenter.model.request;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户修改请求
 *
 * @author fy
 */
@Data
public class UserUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID（管理员更新其他用户时使用）
     */
    private Long id;

    /**
     * 用户昵称
     */
    private String username;

    /**
     * 用户头像
     */
    private String avatarUrl;

    /**
     * 性别
     */
    private Integer gender;

    /**
     * 电话
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 编号
     */
    private String planetCode;

    /**
     * 用户角色（管理员更新其他用户时使用）
     */
    private Integer userRole;
}

