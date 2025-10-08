# 使用更稳定的基础镜像
FROM eclipse-temurin:8-jre-alpine

# 设置工作目录
WORKDIR /app

# 复制预构建的jar文件（如果存在）
COPY target/user-center-backend-0.0.1-SNAPSHOT.jar app.jar

# 如果jar文件不存在，则安装Maven并构建
RUN if [ ! -f app.jar ]; then \
    apk add --no-cache maven openjdk8; \
    fi

# 如果jar文件不存在，复制源码并构建
COPY pom.xml .
COPY src ./src
RUN if [ ! -f app.jar ]; then \
    mvn clean package -DskipTests; \
    cp target/user-center-backend-0.0.1-SNAPSHOT.jar app.jar; \
    fi

# 暴露端口
EXPOSE 8080

# 启动应用
CMD ["java", "-jar", "app.jar"]