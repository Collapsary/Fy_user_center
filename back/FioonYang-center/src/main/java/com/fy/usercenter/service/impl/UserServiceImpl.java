package com.fy.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.fy.usercenter.common.ErrorCode;
import com.fy.usercenter.exception.BussinessException;
import com.fy.usercenter.mapper.UserMapper;
import com.fy.usercenter.model.domain.User;
import com.fy.usercenter.service.UserService;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.fy.usercenter.constant.UserConstant.USER_LOGIN_STATE;

@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource
    private UserMapper userMapper;

    /**
     * 盐值
     */
    public static final String salt = "fy";

    /**
     * 用户注册
     *
     * @param userAccount    用户账号
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @param planetCode    编号
     * @return
     */
    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword, String planetCode) {
        // 1.校验账号是否异常
        // 是否为空
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword, planetCode)) {
            // 自定义异常处理
            throw new BussinessException(ErrorCode.NULL_PARAMS_ERROR, "请求参数为空");
        }

        // 账号不能小于4位
        if (userAccount.length() < 4) {
            throw new BussinessException(ErrorCode.PARAMS_ERROR, "用户账号过短,请输入4位以上账号");
        }

        // 密码不能小于8位
        if (userPassword.length() < 8) {
            throw new BussinessException(ErrorCode.PARAMS_ERROR, "用户密码过短,请输入8位以上密码");
        }

        // 编号不能大于5位
        if(planetCode.length() > 5){
            throw new BussinessException(ErrorCode.PARAMS_ERROR, "编号过长,请输入5位以下编号");
        }

        // 账号是否包含特殊字符
        String validPattern = "\\pP|\\pS|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            return -1;
        }

        // 校验密码是否与密码相等
        if (!userPassword.equals(checkPassword)) {
            return -1;
        }

        // 账号是否已经存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        long count = this.count(queryWrapper);
        if (count > 0) {
            return -1;
        }

        // 编号是否已经存在
        queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("planetCode", planetCode);
        count = this.count(queryWrapper);
        if (count > 0) {
            return -1;
        }

        // 2.对密码进行加密

        String saltPassword = DigestUtils.md5DigestAsHex((userPassword + salt).getBytes());

        // 3.存入数据库
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(saltPassword);
        user.setPlanetCode(planetCode);

        boolean saveResult = this.save(user);
        if (!saveResult) {
            return -1;
        }

        // 返回id
        return user.getId();
    }

    /**
     * 用户登录
     *
     * @param userAccount   用户账号
     * @param userPassword 用户密码
     * @return
     */
    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {

        // 1.校验
        // 是否为空
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            return null;
        }

        // 账号不能小于4位
        if (userAccount.length() < 4) {
            return null;
        }

        // 密码不能小于8位
        if (userPassword.length() < 8) {
            return null;
        }

        // 账号是否包含特殊字符
        String validPattern = "\\pP|\\pS|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            return null;
        }

        // 2.对密码进行加密
        String saltPassword = DigestUtils.md5DigestAsHex((userPassword + salt).getBytes());

        // 账号是否已经存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("userPassword", saltPassword);
        User user = userMapper.selectOne(queryWrapper);
        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            return null;
        }

        // 3.用户脱敏
        User safetyuser = getSafetyUser(user);

        // 4.记录用户的登录态
        request.getSession().setAttribute(USER_LOGIN_STATE, safetyuser);

        return safetyuser;
    }

    /**
     * 用户脱敏
     * @param originUser
     * @return
     */
    @Override
    public User getSafetyUser(User originUser) {
        User safetyuser = new User();
        safetyuser.setId(originUser.getId());
        safetyuser.setUsername(originUser.getUsername());
        safetyuser.setUserAccount(originUser.getUserAccount());
        safetyuser.setAvatarUrl(originUser.getAvatarUrl());
        safetyuser.setGender(originUser.getGender());
        safetyuser.setPhone(originUser.getPhone());
        safetyuser.setEmail(originUser.getEmail());
        safetyuser.setUserStatus(originUser.getUserStatus());
        safetyuser.setCreateTime(originUser.getCreateTime());
        safetyuser.setUserRole(originUser.getUserRole());
        safetyuser.setPlanetCode(originUser.getPlanetCode());

        return safetyuser;
    }

    /**
     * 用户注销
     * @param request
     * @return
     */
    @Override
    public int userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return -2;
    }

    /**
     * 用户修改
     * @param user 用户信息
     * @param request
     * @return
     */
    @Override
    public boolean updateUser(User user, HttpServletRequest request) {
        // 1. 校验参数是否为空
        if (user == null) {
            throw new BussinessException(ErrorCode.NULL_PARAMS_ERROR, "请求参数为空");
        }

        // 2. 校验是否登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        if (userObj == null) {
            throw new BussinessException(ErrorCode.NOT_LOGIN, "未登录");
        }

        User loginUser = (User) userObj;
        Long userId = loginUser.getId();

        // 3. 校验权限：用户只能修改自己的信息
        if (!userId.equals(user.getId())) {
            throw new BussinessException(ErrorCode.NO_AUTH, "无权限");
        }

        // 4. 校验编号是否重复（如果修改了编号）
        if (StringUtils.isNotBlank(user.getPlanetCode())) {
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("planetCode", user.getPlanetCode());
            queryWrapper.ne("id", userId);
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BussinessException(ErrorCode.PARAMS_ERROR, "编号已存在");
            }
        }

        // 5. 执行更新
        boolean result = this.updateById(user);
        if (!result) {
            throw new BussinessException(ErrorCode.SYSTEM_ERROR, "更新失败");
        }

        // 6. 更新session中的用户信息
        User updatedUser = this.getById(userId);
        User safetyUser = getSafetyUser(updatedUser);
        request.getSession().setAttribute(USER_LOGIN_STATE, safetyUser);

        return true;
    }

    /**
     * 忘记密码
     * @param userAccount 用户账号
     * @param phone 电话
     * @param email 邮箱
     * @param newPassword 新密码
     * @param checkPassword 确认新密码
     * @return
     */
    @Override
    public boolean forgetPassword(String userAccount, String phone, String email, String newPassword, String checkPassword) {
        // 1. 校验参数
        if (StringUtils.isAllBlank(userAccount, phone, email)) {
            throw new BussinessException(ErrorCode.NULL_PARAMS_ERROR, "账号、电话、邮箱至少提供一个");
        }

        if (StringUtils.isAnyBlank(newPassword, checkPassword)) {
            throw new BussinessException(ErrorCode.NULL_PARAMS_ERROR, "新密码和确认密码不能为空");
        }

        // 2. 校验密码长度
        if (newPassword.length() < 8) {
            throw new BussinessException(ErrorCode.PARAMS_ERROR, "新密码长度不能小于8位");
        }

        // 3. 校验两次密码是否一致
        if (!newPassword.equals(checkPassword)) {
            throw new BussinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
        }

        // 4. 查找用户
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotBlank(userAccount)) {
            queryWrapper.eq("userAccount", userAccount);
        } else if (StringUtils.isNotBlank(phone)) {
            queryWrapper.eq("phone", phone);
        } else if (StringUtils.isNotBlank(email)) {
            queryWrapper.eq("email", email);
        }

        User user = userMapper.selectOne(queryWrapper);
        if (user == null) {
            throw new BussinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }

        // 5. 加密新密码
        String saltPassword = DigestUtils.md5DigestAsHex((newPassword + salt).getBytes());

        // 6. 更新密码
        user.setUserPassword(saltPassword);
        boolean result = this.updateById(user);
        if (!result) {
            throw new BussinessException(ErrorCode.SYSTEM_ERROR, "密码重置失败");
        }

        return true;
    }


}





