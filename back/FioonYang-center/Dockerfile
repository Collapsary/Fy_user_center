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
