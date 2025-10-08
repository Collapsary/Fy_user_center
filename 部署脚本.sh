#!/bin/bash

# 用户管理系统部署脚本
# 支持Docker和宝塔面板部署

echo "🚀 用户管理系统部署脚本"
echo "================================"

# 检查操作系统
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "✅ 检测到Linux系统"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "✅ 检测到macOS系统"
else
    echo "❌ 不支持的操作系统"
    exit 1
fi

# 选择部署方式
echo ""
echo "请选择部署方式："
echo "1. Docker部署（推荐）"
echo "2. 宝塔面板部署"
echo "3. Railway部署"
echo "4. 退出"
read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo "🐳 开始Docker部署..."
        docker_deploy
        ;;
    2)
        echo "🔧 开始宝塔面板部署..."
        baota_deploy
        ;;
    3)
        echo "🚄 开始Railway部署..."
        railway_deploy
        ;;
    4)
        echo "👋 退出部署"
        exit 0
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

# Docker部署函数
docker_deploy() {
    echo "📦 检查Docker环境..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker未安装，请先安装Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose未安装，请先安装Docker Compose"
        exit 1
    fi
    
    echo "✅ Docker环境检查通过"
    
    # 构建后端应用
    echo "🔨 构建后端应用..."
    cd back/FioonYang-center
    mvn clean package -DskipTests
    
    if [ $? -eq 0 ]; then
        echo "✅ 后端应用构建成功"
    else
        echo "❌ 后端应用构建失败"
        exit 1
    fi
    
    # 启动Docker服务
    echo "🚀 启动Docker服务..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker服务启动成功"
        echo "🌐 后端服务地址: http://localhost:8080"
        echo "🗄️ 数据库地址: localhost:3306"
        echo "📊 查看服务状态: docker-compose ps"
        echo "📝 查看日志: docker-compose logs -f"
    else
        echo "❌ Docker服务启动失败"
        exit 1
    fi
}

# 宝塔面板部署函数
baota_deploy() {
    echo "🔧 宝塔面板部署需要手动操作"
    echo "请按照以下步骤操作："
    echo ""
    echo "1. 安装宝塔面板："
    echo "   wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec"
    echo ""
    echo "2. 在宝塔面板中安装："
    echo "   - Nginx 1.20"
    echo "   - MySQL 8.0"
    echo "   - Java 8"
    echo "   - Maven 3.8"
    echo ""
    echo "3. 创建数据库："
    echo "   - 数据库名: user_center"
    echo "   - 用户名: usercenter"
    echo "   - 密码: user123456"
    echo ""
    echo "4. 上传代码到 /www/wwwroot/user-center/"
    echo ""
    echo "5. 构建应用："
    echo "   cd /www/wwwroot/user-center/back/FioonYang-center"
    echo "   mvn clean package -DskipTests"
    echo ""
    echo "6. 配置PM2管理应用"
    echo ""
    echo "详细步骤请参考: 完全免费部署教程.md"
}

# Railway部署函数
railway_deploy() {
    echo "🚄 Railway部署需要手动操作"
    echo "请按照以下步骤操作："
    echo ""
    echo "1. 访问 https://railway.app/"
    echo "2. 使用GitHub账号登录"
    echo "3. 创建新项目"
    echo "4. 选择 'Deploy from GitHub repo'"
    echo "5. 选择您的仓库"
    echo "6. 设置构建目录: back/FioonYang-center"
    echo "7. 配置环境变量："
    echo "   SPRING_PROFILES_ACTIVE=prod"
    echo "   MYSQL_HOST=mysql"
    echo "   MYSQL_PORT=3306"
    echo "   MYSQL_DATABASE=user_center"
    echo "   MYSQL_USER=usercenter"
    echo "   MYSQL_PASSWORD=user123456"
    echo ""
    echo "8. 添加MySQL服务"
    echo "9. 部署前端到Vercel"
    echo ""
    echo "详细步骤请参考: 完全免费部署教程.md"
}

echo ""
echo "🎉 部署完成！"
echo "📖 详细文档: 完全免费部署教程.md"
echo "🆘 如有问题，请查看文档或寻求帮助"
