# 用户管理系统

一个基于Spring Boot和React的现代化用户管理系统，支持用户注册、登录、权限管理等功能。

## 🚀 项目特性

### 核心功能
- ✅ 用户注册/登录/登出
- ✅ 忘记密码功能
- ✅ 用户信息管理
- ✅ 权限分级控制
- ✅ 用户删除功能

### 技术特性
- ✅ 响应式设计
- ✅ 权限控制
- ✅ 错误处理
- ✅ 数据验证
- ✅ 安全防护

## 🛠️ 技术栈

### 后端
- **框架**: Spring Boot 2.7.0
- **数据库**: MySQL 8.0
- **ORM**: MyBatis-Plus
- **安全**: Spring Security
- **文档**: Knife4j (Swagger)

### 前端
- **框架**: React 17
- **UI库**: Ant Design Pro
- **构建工具**: UmiJS
- **状态管理**: UmiJS Model
- **HTTP客户端**: Umi Request

## 📁 项目结构

```
user-management-system/
├── back/                          # 后端代码
│   └── FioonYang-center/
│       ├── src/main/java/         # Java源码
│       ├── src/main/resources/    # 配置文件
│       ├── pom.xml               # Maven配置
│       ├── Dockerfile            # Docker配置
│       └── railway.json          # Railway部署配置
├── front/                         # 前端代码
│   └── user-center-frontend-master/
│       ├── src/                  # React源码
│       ├── package.json          # NPM配置
│       ├── vercel.json           # Vercel部署配置
│       └── dist/                 # 构建产物
├── .gitignore                    # Git忽略文件
└── README.md                     # 项目说明
```

## 🚀 快速开始

### 环境要求
- Java 8+
- Node.js 14+
- MySQL 8.0+
- Maven 3.6+

### 本地开发

#### 后端启动
```bash
cd back/FioonYang-center
mvn clean install
mvn spring-boot:run
```

#### 前端启动
```bash
cd front/user-center-frontend-master
npm install
npm start
```

### 访问地址
- 前端: http://localhost:8000
- 后端: http://localhost:8080
- API文档: http://localhost:8080/doc.html

## 🔧 配置说明

### 数据库配置
修改 `back/FioonYang-center/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/user_center
    username: root
    password: your_password
```

### 前端API配置
修改 `front/user-center-frontend-master/src/plugins/globalRequest.ts`:
```typescript
prefix: 'http://localhost:8080'
```

## 📊 功能说明

### 用户认证
- 用户注册：支持账号、密码、确认密码验证
- 用户登录：支持自动登录功能
- 忘记密码：支持通过账号/手机/邮箱重置密码

### 用户管理
- 用户列表：支持分页、搜索、排序
- 用户编辑：支持基本信息修改
- 用户删除：支持权限控制删除

### 权限控制
- 管理员：可以管理所有用户
- 普通用户：只能管理自己的信息
- 权限验证：前后端双重验证

## 🚀 部署指南

### 部署平台
- **前端**: Vercel
- **后端**: Railway
- **数据库**: Railway MySQL

### 部署步骤
1. 参考 `GitHub上传指南.md` 上传代码
2. 参考 `部署快速开始.md` 进行部署
3. 参考 `部署测试清单.md` 验证功能

## 📚 文档

- [GitHub上传指南](GitHub上传指南.md)
- [部署快速开始](部署快速开始.md)
- [部署测试清单](部署测试清单.md)
- [初学者部署指南](初学者部署指南.md)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT License

## 👨‍💻 作者

您的名字

---

**如果这个项目对您有帮助，请给个Star ⭐️**
