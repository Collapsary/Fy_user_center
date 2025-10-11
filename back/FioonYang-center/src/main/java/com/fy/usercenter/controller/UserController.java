package com.fy.usercenter.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fy.usercenter.common.Result;
import com.fy.usercenter.constant.MessageConstant;
import com.fy.usercenter.model.domain.User;
import com.fy.usercenter.model.request.UserLoginRequest;
import com.fy.usercenter.model.request.UserRegisterRequest;
import com.fy.usercenter.model.request.UserUpdateRequest;
import com.fy.usercenter.model.request.ForgetPasswordRequest;
import com.fy.usercenter.service.UserService;
import io.swagger.annotations.Api;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import io.swagger.annotations.ApiOperation;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.fy.usercenter.constant.UserConstant.ADMIN_ROLE;
import static com.fy.usercenter.constant.UserConstant.USER_LOGIN_STATE;

/**
 * 用户接口
 */
@RestController
@RequestMapping("/api/user")
@Api(tags = "用户模块")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000"}, 
             allowCredentials = "true", 
             maxAge = 3600)
public class UserController {

    @Resource
    private UserService userService;



    /**
     * 用户注册
     * @param userRegisterRequest 用户注册请求体
     * @return
     */
    @ApiOperation("用户注册")
    @PostMapping("/register")
    public Result<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {

        if(userRegisterRequest == null) {
            return Result.error(MessageConstant.REQUEST_NULL);
        }

        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        String planetCode = userRegisterRequest.getPlanetCode();

        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword, planetCode)) {
            return Result.error(MessageConstant.PARAMS_NULL);

        }

        long result = userService.userRegister(userAccount, userPassword, checkPassword, planetCode);
        return Result.success(result);
    }

    /**
     * 用户登录
     * @param userLoginRequest 用户登录请求体
     * @return
     */
    @ApiOperation("用户登录")
    @PostMapping("/login")
    public Result<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {

        if(userLoginRequest == null) {
            return Result.error(MessageConstant.REQUEST_NULL);
        }

        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword)) {
            return Result.error(MessageConstant.PARAMS_NULL);
        }

        User user = userService.userLogin(userAccount, userPassword, request);
        return Result.success(user);
    }

    @PostMapping("/logout")
    @ApiOperation("用户注销")
    public Result<Integer> userLogout(HttpServletRequest request) {
        if(request == null){
            return null;
        }
        int result = userService.userLogout(request);
        return Result.success(result);
    }

    /**
     * 获取当前用户
     * @param request HTTP请求
     * @return 当前用户信息
     */
    @GetMapping("/current")
    @ApiOperation("获取当前用户")
    public Result<User> getCurrentUser(HttpServletRequest request) {
        if (request == null) {
            return Result.error(MessageConstant.REQUEST_NULL);
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        if (userObj == null) {
            System.out.println("获取当前用户失败: 用户未登录");
            return Result.error(MessageConstant.NOT_LOGIN);
        }

        User currentUser = (User) userObj;
        System.out.println("获取当前用户: " + currentUser.getUsername() + ", 角色: " + currentUser.getUserRole());
        User safetyUser = userService.getSafetyUser(currentUser);
        System.out.println("返回用户信息: " + safetyUser.getUsername() + ", 角色: " + safetyUser.getUserRole());
        return Result.success(safetyUser);
    }

    /**
     * 用户查询
     * @param username 用户名
     * @return
     */
    @GetMapping("/search")
    @ApiOperation("用户查询")
    public Result<List<User>> searchUsers(String username, HttpServletRequest request ) {
        // 检查是否登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        if (userObj == null) {
            System.out.println("用户查询失败: 用户未登录");
            return Result.error(MessageConstant.NOT_LOGIN);
        }

        User currentUser = (User) userObj;
        System.out.println("当前用户: " + currentUser.getUsername() + ", 角色: " + currentUser.getUserRole());

        // 所有登录用户都可以查看用户列表
        System.out.println("用户查询用户列表，当前用户: " + currentUser.getUsername() + ", 角色: " + currentUser.getUserRole());
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNotBlank(username)) {
            queryWrapper.like("username", username);
        }
        List<User> userList = userService.list(queryWrapper);
        List<User> result =  userList.stream().map(user -> userService.getSafetyUser(user)).collect(Collectors.toList());
        System.out.println("查询到用户数量: " + result.size());
        return Result.success(result);
    }


    /**
     * 用户删除
     * @param id 用户id
     * @return
     */
    @PostMapping("/delete")
    @ApiOperation("用户删除")
    public Result<Boolean> deleteUser(@RequestBody long id, HttpServletRequest request) {
        // 校验是否登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        if (userObj == null) {
            return Result.error(MessageConstant.NOT_LOGIN);
        }

        User currentUser = (User) userObj;
        boolean isAdmin = isAdmin(request);

        // 权限检查：管理员可以删除任何用户，普通用户只能删除自己
        if (!isAdmin && !currentUser.getId().equals(id)) {
            return Result.error(MessageConstant.NOT_PERMISSION);
        }

        if(id <= 0) {
            return Result.error(MessageConstant.USER_NOT_EXIST);
        }

        // 检查用户是否存在
        User userToDelete = userService.getById(id);
        if (userToDelete == null) {
            return Result.error(MessageConstant.USER_NOT_EXIST);
        }

        boolean result = userService.removeById(id);
        return Result.success(result);
    }

    /**
     * 用户修改
     * @param userUpdateRequest 用户修改请求体
     * @param request HTTP请求
     * @return
     */
    @PostMapping("/update")
    @ApiOperation("用户修改")
    public Result<Boolean> updateUser(@RequestBody UserUpdateRequest userUpdateRequest, HttpServletRequest request) {
        if (userUpdateRequest == null) {
            return Result.error(MessageConstant.REQUEST_NULL);
        }

        // 校验是否登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        if (userObj == null) {
            return Result.error(MessageConstant.NOT_LOGIN);
        }

        User loginUser = (User) userObj;
        
        // 创建要更新的用户对象
        User user = new User();
        user.setId(loginUser.getId());
        
        // 普通用户只能更新自己的基本信息，不能修改编号和角色
        if (StringUtils.isNotBlank(userUpdateRequest.getUsername())) {
            user.setUsername(userUpdateRequest.getUsername());
        }
        if (StringUtils.isNotBlank(userUpdateRequest.getAvatarUrl())) {
            user.setAvatarUrl(userUpdateRequest.getAvatarUrl());
        }
        if (userUpdateRequest.getGender() != null) {
            user.setGender(userUpdateRequest.getGender());
        }
        if (StringUtils.isNotBlank(userUpdateRequest.getPhone())) {
            user.setPhone(userUpdateRequest.getPhone());
        }
        if (StringUtils.isNotBlank(userUpdateRequest.getEmail())) {
            user.setEmail(userUpdateRequest.getEmail());
        }
        // 注意：普通用户不能修改planetCode和userRole

        boolean result = userService.updateUser(user, request);
        return Result.success(result);
    }

    /**
     * 管理员更新用户信息
     * @param userUpdateRequest 用户修改请求体
     * @param request HTTP请求
     * @return
     */
    @PostMapping("/admin/update")
    @ApiOperation("管理员更新用户信息")
    public Result<Boolean> adminUpdateUser(@RequestBody UserUpdateRequest userUpdateRequest, HttpServletRequest request) {
        if (userUpdateRequest == null) {
            return Result.error(MessageConstant.REQUEST_NULL);
        }

        // 校验是否登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        if (userObj == null) {
            return Result.error(MessageConstant.NOT_LOGIN);
        }

        User loginUser = (User) userObj;
        
        // 检查是否为管理员
        if (!isAdmin(request)) {
            return Result.error(MessageConstant.NOT_PERMISSION);
        }

        // 创建要更新的用户对象
        User user = new User();
        user.setId(userUpdateRequest.getId());
        
        // 管理员只能修改用户角色
        if (userUpdateRequest.getUserRole() != null) {
            user.setUserRole(userUpdateRequest.getUserRole());
        }

        boolean result = userService.updateById(user);
        return Result.success(result);
    }

    /**
     * 忘记密码
     * @param forgetPasswordRequest 忘记密码请求体
     * @return
     */
    @PostMapping("/forget-password")
    @ApiOperation("忘记密码")
    public Result<Boolean> forgetPassword(@RequestBody ForgetPasswordRequest forgetPasswordRequest) {
        if (forgetPasswordRequest == null) {
            return Result.error(MessageConstant.REQUEST_NULL);
        }

        String userAccount = forgetPasswordRequest.getUserAccount();
        String phone = forgetPasswordRequest.getPhone();
        String email = forgetPasswordRequest.getEmail();
        String newPassword = forgetPasswordRequest.getNewPassword();
        String checkPassword = forgetPasswordRequest.getCheckPassword();

        System.out.println("忘记密码请求 - 账号: " + userAccount + ", 电话: " + phone + ", 邮箱: " + email);
        
        boolean result = userService.forgetPassword(userAccount, phone, email, newPassword, checkPassword);
        System.out.println("忘记密码结果: " + result);
        
        return Result.success(result);
    }

    /**
     * 识别用户是否为管理员
     *
     * @param request
     * @return
     */
    private boolean isAdmin(HttpServletRequest request) {
        // 仅管理员
        Object userobj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) userobj;
        return user != null && user.getUserRole() == ADMIN_ROLE;
    }




}
