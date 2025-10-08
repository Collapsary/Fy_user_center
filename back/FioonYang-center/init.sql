CREATE DATABASE IF NOT EXISTS user_center CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE user_center;

CREATE TABLE IF NOT EXISTS user (
    id bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
    username varchar(256) DEFAULT NULL COMMENT '用户昵称',
    userAccount varchar(256) NOT NULL COMMENT '账号',
    avatarUrl varchar(1024) DEFAULT NULL COMMENT '用户头像',
    gender tinyint DEFAULT NULL COMMENT '性别',
    userPassword varchar(512) NOT NULL COMMENT '密码',
    phone varchar(128) DEFAULT NULL COMMENT '电话',
    email varchar(512) DEFAULT NULL COMMENT '邮箱',
    userStatus int NOT NULL DEFAULT '0' COMMENT '状态 0 - 正常',
    createTime datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updateTime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    isDelete tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
    userRole int NOT NULL DEFAULT '0' COMMENT '用户角色 0 - 普通用户 1 - 管理员',
    planetCode varchar(512) DEFAULT NULL COMMENT '星球编号',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户';