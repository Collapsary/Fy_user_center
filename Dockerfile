FROM openjdk:8-jre-alpine
WORKDIR /app
RUN apk add --no-cache maven
COPY back/FioonYang-center/pom.xml .
COPY back/FioonYang-center/src ./src
RUN mvn clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/user-center-backend-0.0.1-SNAPSHOT.jar"]
