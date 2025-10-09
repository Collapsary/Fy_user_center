FROM openjdk:8-jre-alpine
WORKDIR /app
COPY target/user-center-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-Xmx512m -Xms256m"
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]