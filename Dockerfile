FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/personalWeb-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 10000
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"
CMD java $JAVA_OPTS -jar app.jar