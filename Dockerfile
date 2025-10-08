# 使用OpenJDK 8作为基础镜像
FROM openjdk:8-jdk-alpine

# 设置工作目录
WORKDIR /app

# 复制Maven配置文件
COPY back/FioonYang-center/pom.xml .
COPY back/FioonYang-center/src ./src

# 安装Maven
RUN apk add --no-cache maven

# 构建应用
RUN mvn clean package -DskipTests

# 暴露端口
EXPOSE 8080

# 启动应用
CMD ["java", "-jar", "target/user-center-backend-0.0.1-SNAPSHOT.jar"]
