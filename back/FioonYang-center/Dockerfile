# 使用更稳定的OpenJDK 8镜像
FROM openjdk:8-jre-alpine

# 设置工作目录
WORKDIR /app

# 复制预构建的jar文件
COPY target/user-center-backend-0.0.1-SNAPSHOT.jar app.jar

# 暴露端口
EXPOSE 8080

# 启动应用
CMD ["java", "-jar", "app.jar"]


