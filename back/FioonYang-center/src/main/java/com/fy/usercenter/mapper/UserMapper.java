package com.fy.usercenter.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fy.usercenter.model.domain.User;
import org.apache.ibatis.annotations.Mapper;


/**
 * @author trly yang
 * @description 针对表【user】的数据库操作Mapper
 * @createDate 2025-09-24 15:18:33
 * @Entity com.fy.usercenter.model.domain.User
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}





