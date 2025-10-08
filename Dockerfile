# 这个Dockerfile用于后端服务
# 如果Railway在根目录寻找Dockerfile，这个文件会被使用
FROM openjdk:8-jre-alpine
WORKDIR /app
COPY back/FioonYang-center/target/user-center-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
