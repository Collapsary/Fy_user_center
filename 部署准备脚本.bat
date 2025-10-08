@echo off
echo ========================================
echo 用户管理系统部署准备脚本
echo ========================================
echo.

echo [1/4] 检查Git状态...
git status
echo.

echo [2/4] 构建前端...
cd front/user-center-frontend-master
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo 前端构建失败！
    pause
    exit /b 1
)
echo 前端构建成功！
cd ../..
echo.

echo [3/4] 编译后端...
cd back/FioonYang-center
call mvn clean compile
if %errorlevel% neq 0 (
    echo 后端编译失败！
    pause
    exit /b 1
)
echo 后端编译成功！
cd ../..
echo.

echo [4/4] 检查部署文件...
if exist "back/FioonYang-center/src/main/resources/application-prod.yml" (
    echo ✓ 生产环境配置文件存在
) else (
    echo ✗ 生产环境配置文件不存在
)

if exist "back/FioonYang-center/Dockerfile" (
    echo ✓ Dockerfile存在
) else (
    echo ✗ Dockerfile不存在
)

if exist "back/FioonYang-center/railway.json" (
    echo ✓ Railway配置文件存在
) else (
    echo ✗ Railway配置文件不存在
)

if exist "front/user-center-frontend-master/vercel.json" (
    echo ✓ Vercel配置文件存在
) else (
    echo ✗ Vercel配置文件不存在
)

echo.
echo ========================================
echo 部署准备完成！
echo ========================================
echo.
echo 下一步：
echo 1. 将代码推送到GitHub
echo 2. 按照《部署快速开始.md》进行部署
echo.
pause
