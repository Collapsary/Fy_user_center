# 📚 GitHub上传项目完整指南

## 🎯 目标
将您的用户管理系统项目上传到GitHub，为后续部署做准备。

## 📋 准备工作

### 1. 注册GitHub账号
- 访问 [GitHub官网](https://github.com/)
- 点击 "Sign up" 注册账号
- 验证邮箱地址

### 2. 安装Git工具
- 下载 [Git for Windows](https://git-scm.com/download/win)
- 安装时选择默认选项
- 验证安装：打开命令行输入 `git --version`

## 🚀 上传步骤

### 第1步：创建GitHub仓库

#### 1.1 登录GitHub
1. 访问 [GitHub](https://github.com/)
2. 点击右上角头像 → "Your repositories"
3. 点击 "New" 创建新仓库

#### 1.2 配置仓库信息
- **Repository name**: `user-management-system`（或您喜欢的名字）
- **Description**: `用户管理系统 - 基于Spring Boot和React`
- **Visibility**: 选择 "Public"（公开）或 "Private"（私有）
- **Initialize**: 不要勾选任何选项（我们会上传现有代码）

#### 1.3 创建仓库
点击 "Create repository"

### 第2步：准备本地项目

#### 2.1 检查当前目录
确保您在项目根目录：`F:\javaweb-code\Fy_center`

#### 2.2 初始化Git仓库
```bash
git init
```

#### 2.3 添加远程仓库
```bash
git remote add origin https://github.com/您的用户名/仓库名.git
```

### 第3步：创建.gitignore文件

创建 `.gitignore` 文件，忽略不需要上传的文件：

**文件：`.gitignore`**
```
# 前端忽略文件
front/user-center-frontend-master/node_modules/
front/user-center-frontend-master/dist/
front/user-center-frontend-master/.umi/
front/user-center-frontend-master/.umi-production/
front/user-center-frontend-master/.umi-test/
front/user-center-frontend-master/.env.local
front/user-center-frontend-master/.env.development.local
front/user-center-frontend-master/.env.test.local
front/user-center-frontend-master/.env.production.local

# 后端忽略文件
back/FioonYang-center/target/
back/FioonYang-center/.mvn/
back/FioonYang-center/mvnw
back/FioonYang-center/mvnw.cmd
back/FioonYang-center/.idea/
back/FioonYang-center/*.iml
back/FioonYang-center/.vscode/

# 系统文件
.DS_Store
Thumbs.db
*.log
*.tmp
*.swp
*.swo

# IDE文件
.idea/
.vscode/
*.iml
*.ipr
*.iws

# 临时文件
*.tmp
*.temp
```

### 第4步：添加和提交代码

#### 4.1 添加所有文件
```bash
git add .
```

#### 4.2 提交代码
```bash
git commit -m "Initial commit: 用户管理系统项目"
```

#### 4.3 推送到GitHub
```bash
git push -u origin main
```

## 🔧 详细操作步骤

### 方法一：使用命令行（推荐）

#### 1. 打开命令行
- 按 `Win + R`，输入 `cmd`，回车
- 或者按 `Win + X`，选择 "Windows PowerShell"

#### 2. 导航到项目目录
```bash
cd F:\javaweb-code\Fy_center
```

#### 3. 执行Git命令
```bash
# 初始化Git仓库
git init

# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/您的用户名/仓库名.git

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 用户管理系统项目"

# 推送到GitHub
git push -u origin main
```

### 方法二：使用GitHub Desktop（图形界面）

#### 1. 下载GitHub Desktop
- 访问 [GitHub Desktop](https://desktop.github.com/)
- 下载并安装

#### 2. 登录GitHub账号
- 打开GitHub Desktop
- 登录您的GitHub账号

#### 3. 添加本地仓库
- 点击 "Add an Existing Repository from your Hard Drive"
- 选择项目目录：`F:\javaweb-code\Fy_center`
- 点击 "Add Repository"

#### 4. 发布到GitHub
- 点击 "Publish repository"
- 输入仓库名称和描述
- 选择公开或私有
- 点击 "Publish Repository"

## 🆘 常见问题解决

### 问题1：Git命令不存在
**解决方案**：
1. 安装Git工具
2. 重启命令行
3. 验证安装：`git --version`

### 问题2：认证失败
**解决方案**：
1. 使用Personal Access Token
2. 在GitHub设置中生成Token
3. 使用Token作为密码

### 问题3：推送被拒绝
**解决方案**：
```bash
# 拉取远程代码
git pull origin main --allow-unrelated-histories

# 再次推送
git push origin main
```

### 问题4：文件太大
**解决方案**：
1. 检查.gitignore文件
2. 移除大文件
3. 使用Git LFS（如果需要）

## 📊 上传后验证

### 检查上传结果
1. 访问您的GitHub仓库页面
2. 确认所有文件都已上传
3. 检查文件结构是否正确

### 预期文件结构
```
user-management-system/
├── back/
│   └── FioonYang-center/
│       ├── src/
│       ├── pom.xml
│       ├── Dockerfile
│       └── railway.json
├── front/
│   └── user-center-frontend-master/
│       ├── src/
│       ├── package.json
│       ├── vercel.json
│       └── dist/
├── .gitignore
└── README.md
```

## 🎉 上传完成

### 下一步
1. ✅ 代码已上传到GitHub
2. 🚀 可以开始部署流程
3. 📚 参考《部署快速开始.md》

### 部署准备
- 前端构建：`npm run build`
- 后端编译：`mvn compile`
- 配置文件：已准备就绪

---

**恭喜！您的项目已成功上传到GitHub！** 🎊
