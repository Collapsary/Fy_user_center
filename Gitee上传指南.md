# 📚 Gitee上传项目完整指南

## 🎯 目标
将您的用户管理系统项目上传到Gitee，为后续部署做准备。

## 📋 准备工作

### 1. 注册Gitee账号
- 访问 [Gitee官网](https://gitee.com/)
- 点击 "注册" 创建账号
- 验证邮箱地址

### 2. 安装Git工具
- 下载 [Git for Windows](https://git-scm.com/download/win)
- 安装时选择默认选项
- 验证安装：打开命令行输入 `git --version`

## 🚀 上传步骤

### 第1步：创建Gitee仓库

#### 1.1 登录Gitee
1. 访问 [Gitee](https://gitee.com/)
2. 点击右上角头像 → "我的仓库"
3. 点击 "新建仓库" 创建新仓库

#### 1.2 配置仓库信息
- **仓库名称**: `user-management-system`（或您喜欢的名字）
- **仓库描述**: `用户管理系统 - 基于Spring Boot和React`
- **开源许可证**: 选择 "MIT License"
- **语言**: 选择 "Java"
- **是否开源**: 选择 "公开" 或 "私有"
- **使用Readme文件初始化这个仓库**: 不要勾选（我们会上传现有代码）

#### 1.3 创建仓库
点击 "创建"

### 第2步：准备本地项目

#### 2.1 检查当前目录
确保您在项目根目录：`F:\javaweb-code\Fy_center`

#### 2.2 初始化Git仓库
```bash
git init
```

#### 2.3 添加远程仓库
```bash
git remote add origin https://gitee.com/您的用户名/仓库名.git
```

### 第3步：创建.gitignore文件

已创建 `.gitignore` 文件，忽略不需要上传的文件。

### 第4步：添加和提交代码

#### 4.1 添加所有文件
```bash
git add .
```

#### 4.2 提交代码
```bash
git commit -m "Initial commit: 用户管理系统项目"
```

#### 4.3 推送到Gitee
```bash
git push -u origin master
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
git remote add origin https://gitee.com/您的用户名/仓库名.git

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 用户管理系统项目"

# 推送到Gitee
git push -u origin master
```

### 方法二：使用Gitee Desktop（图形界面）

#### 1. 下载Gitee Desktop
- 访问 [Gitee Desktop](https://gitee.com/help/articles/4114)
- 下载并安装

#### 2. 登录Gitee账号
- 打开Gitee Desktop
- 登录您的Gitee账号

#### 3. 添加本地仓库
- 点击 "添加本地仓库"
- 选择项目目录：`F:\javaweb-code\Fy_center`
- 点击 "添加"

#### 4. 发布到Gitee
- 点击 "发布"
- 输入仓库名称和描述
- 选择公开或私有
- 点击 "发布"

## 🆘 常见问题解决

### 问题1：Git命令不存在
**解决方案**：
1. 安装Git工具
2. 重启命令行
3. 验证安装：`git --version`

### 问题2：认证失败
**解决方案**：
1. 使用用户名和密码
2. 或者使用SSH密钥
3. 在Gitee设置中配置SSH

### 问题3：推送被拒绝
**解决方案**：
```bash
# 拉取远程代码
git pull origin master --allow-unrelated-histories

# 再次推送
git push origin master
```

### 问题4：文件太大
**解决方案**：
1. 检查.gitignore文件
2. 移除大文件
3. 使用Git LFS（如果需要）

## 📊 上传后验证

### 检查上传结果
1. 访问您的Gitee仓库页面
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

## 🚀 部署兼容性

### Vercel部署
- ✅ 支持从Gitee导入项目
- ✅ 自动部署功能正常
- ✅ 环境变量配置相同

### Railway部署
- ✅ 支持从Gitee导入项目
- ✅ 自动部署功能正常
- ✅ 环境变量配置相同

## 🎉 上传完成

### 下一步
1. ✅ 代码已上传到Gitee
2. 🚀 可以开始部署流程
3. 📚 参考《部署快速开始.md》

### 部署准备
- 前端构建：`npm run build`
- 后端编译：`mvn compile`
- 配置文件：已准备就绪

---

**恭喜！您的项目已成功上传到Gitee！** 🎊
