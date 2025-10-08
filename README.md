# 用户管理系统

这是一个基于Spring Boot和UmiJS实现的用户管理系统。

## 功能特性

- ✅ 用户注册、登录、忘记密码
- ✅ 用户信息管理（查看、编辑、删除）
- ✅ 权限分级（管理员、普通用户）
- ✅ 前后端分离架构
- ✅ 响应式设计

## 技术栈

### 后端
- Spring Boot 2.7.0
- MyBatis-Plus 3.5.2
- MySQL 8.0
- Maven 3.6+

### 前端
- UmiJS 3.5.0
- Ant Design Pro
- React 17
- TypeScript

## 快速开始

### 本地开发

1. **启动后端**
   ```bash
   cd back/FioonYang-center
   mvn spring-boot:run
   ```

2. **启动前端**
   ```bash
   cd front/user-center-frontend-master
   npm install
   npm start
   ```

3. **访问应用**
   - 前端：http://localhost:8000
   - 后端API：http://localhost:8080
   - API文档：http://localhost:8080/doc.html

## 项目结构

```
Fy_center/
├── back/                          # 后端代码
│   └── FioonYang-center/
│       ├── src/main/java/         # Java源码
│       ├── src/main/resources/    # 配置文件
│       └── pom.xml               # Maven配置
├── front/                         # 前端代码
│   └── user-center-frontend-master/
│       ├── src/                   # React源码
│       ├── config/                # UmiJS配置
│       └── package.json          # 依赖配置
└── README.md                      # 项目说明
```

## 开发说明

### 数据库设计
- 用户表：存储用户基本信息
- 支持用户角色管理
- 支持软删除

### API接口
- RESTful API设计
- 统一响应格式
- 异常处理机制

### 前端特性
- 响应式布局
- 权限控制
- 表单验证
- 错误处理

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！