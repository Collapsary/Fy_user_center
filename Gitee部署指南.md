# 🚀 基于Gitee的部署指南

## 🎯 部署方案（Gitee版本）

**推荐方案：Vercel + Railway + MySQL + Gitee**
- **代码托管**：Gitee（码云）
- **前端**：Vercel（支持Gitee导入）
- **后端**：Railway（支持Gitee导入）
- **数据库**：Railway MySQL

## 📋 部署前准备

### 1. 注册账号
- [Gitee](https://gitee.com/) - 代码托管
- [Vercel](https://vercel.com/) - 前端部署
- [Railway](https://railway.app/) - 后端和数据库部署

### 2. 准备代码
确保您的代码已经推送到Gitee仓库

## 🗄️ 第一步：部署数据库

### 1.1 登录Railway
1. 访问 [Railway](https://railway.app/)
2. 点击 "Login" 使用GitHub账号登录
3. 授权Railway访问您的GitHub

### 1.2 创建MySQL数据库
1. 在Railway控制台点击 "New Project"
2. 选择 "Provision MySQL"
3. 等待数据库创建完成（约1-2分钟）

### 1.3 获取数据库连接信息
1. 点击创建的MySQL服务
2. 切换到 "Variables" 标签
3. 记录以下信息：
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_DATABASE`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`

## 🔧 第二步：准备后端部署

### 2.1 修改后端配置

**文件：`back/FioonYang-center/src/main/resources/application-prod.yml`**
```yaml
server:
  port: ${PORT:8080}

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: ${MYSQL_USER}
    password: ${MYSQL_PASSWORD}
  
  # 生产环境配置
  profiles:
    active: prod

# MyBatis-Plus配置
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      logic-delete-field: isDelete
      logic-delete-value: 1
      logic-not-delete-value: 0

# 日志配置
logging:
  level:
    com.fy.usercenter: INFO
    org.springframework: WARN
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

### 2.2 创建Dockerfile

**文件：`back/FioonYang-center/Dockerfile`**
```dockerfile
# 使用OpenJDK 8作为基础镜像
FROM openjdk:8-jre-alpine

# 设置工作目录
WORKDIR /app

# 复制jar包
COPY target/*.jar app.jar

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["java", "-jar", "app.jar"]
```

### 2.3 创建Railway配置文件

**文件：`back/FioonYang-center/railway.json`**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/*.jar",
    "healthcheckPath": "/api/user/current"
  }
}
```

## 🌐 第三步：部署后端到Railway

### 3.1 连接Gitee仓库
1. 在Railway控制台点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择您的项目仓库
4. 选择后端目录：`back/FioonYang-center`

**注意**：Railway主要支持GitHub，但您可以通过以下方式解决：
- 将Gitee仓库同步到GitHub
- 或者使用Railway的GitHub导入功能

### 3.2 配置环境变量
在Railway项目设置中添加环境变量：
```
SPRING_PROFILES_ACTIVE=prod
MYSQL_HOST=您的数据库主机
MYSQL_PORT=您的数据库端口
MYSQL_DATABASE=您的数据库名
MYSQL_USER=您的数据库用户名
MYSQL_PASSWORD=您的数据库密码
```

### 3.3 部署
1. Railway会自动检测到Java项目
2. 自动构建和部署
3. 等待部署完成（约5-10分钟）

## 🎨 第四步：准备前端部署

### 4.1 修改前端配置

**文件：`front/user-center-frontend-master/src/plugins/globalRequest.ts`**
```typescript
const request = extend({
  credentials: 'include',
  // 生产环境使用Railway后端地址
  prefix: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL || 'https://您的Railway后端域名.railway.app' 
    : 'http://localhost:8080',
  timeout: 10000,
});
```

### 4.2 创建Vercel配置文件

**文件：`front/user-center-frontend-master/vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🚀 第五步：部署前端到Vercel

### 5.1 连接Gitee仓库
1. 访问 [Vercel](https://vercel.com/)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择您的Gitee仓库
5. 选择前端目录：`front/user-center-frontend-master`

**注意**：Vercel支持Gitee导入，但可能需要：
- 在Vercel中连接Gitee账号
- 或者将Gitee仓库同步到GitHub

### 5.2 配置构建设置
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5.3 配置环境变量
在Vercel项目设置中添加：
```
NODE_ENV=production
REACT_APP_API_URL=https://您的Railway后端域名.railway.app
```

### 5.4 部署
1. 点击 "Deploy"
2. 等待构建完成（约3-5分钟）
3. 获得部署URL

## 🔗 第六步：配置域名和SSL

### 6.1 自定义域名（可选）
1. 在Vercel项目设置中添加自定义域名
2. 配置DNS解析
3. 自动获得SSL证书

### 6.2 测试部署
1. 访问前端URL
2. 测试登录功能
3. 测试用户管理功能

## 📊 第七步：监控和维护

### 7.1 监控服务
- **Vercel**: 自动监控前端性能
- **Railway**: 监控后端和数据库状态

### 7.2 日志查看
- **Vercel**: 在项目页面查看构建和运行日志
- **Railway**: 在服务页面查看应用日志

## 🆘 常见问题解决

### 问题1：Railway无法连接Gitee
**解决方案**：
1. 将Gitee仓库同步到GitHub
2. 使用GitHub仓库进行Railway部署
3. 或者使用其他支持Gitee的部署平台

### 问题2：Vercel无法连接Gitee
**解决方案**：
1. 在Vercel中连接Gitee账号
2. 或者将Gitee仓库同步到GitHub
3. 使用GitHub仓库进行Vercel部署

### 问题3：后端连接数据库失败
**解决方案**：
1. 检查Railway数据库是否正常运行
2. 检查环境变量是否正确配置
3. 检查数据库连接字符串格式

### 问题4：前端无法访问后端API
**解决方案**：
1. 检查前端配置中的后端URL是否正确
2. 检查Railway后端服务是否正常运行
3. 检查CORS配置

## 💰 费用说明

### 免费额度
- **Gitee**: 公开仓库免费，私有仓库免费
- **Vercel**: 每月100GB带宽，无限制部署
- **Railway**: 每月$5免费额度，足够小型项目使用

### 升级建议
当项目规模扩大时，可以考虑：
- 升级到付费计划获得更多资源
- 使用专业的云服务商（阿里云、腾讯云等）

## 🎉 部署完成检查清单

- [ ] 代码已上传到Gitee
- [ ] 数据库部署成功
- [ ] 后端API部署成功
- [ ] 前端部署成功
- [ ] 登录功能正常
- [ ] 用户管理功能正常
- [ ] 忘记密码功能正常
- [ ] 权限控制正常
- [ ] 自定义域名配置（可选）

## 📞 技术支持

如果在部署过程中遇到问题，可以：
1. 查看平台官方文档
2. 在Gitee Issues中提问
3. 寻求社区帮助

---

**恭喜！** 按照这个指南，您应该能够成功部署您的用户管理系统到线上环境！
