# Full-Stack Blog Platform

A comprehensive, fully-featured blog platform featuring an administration panel, asynchronous notification system, and real-time interactive capabilities. 

## 🚀 Key Features

*   **Secure & Auditable**: Comprehensive integration of **Spring Security** along with **Spring Security Events** for precise auditing of user actions.
*   **Asynchronous Processing**: **Custom Async Task Executors** ensure non-blocking, fast execution for features like the comment and notification systems.
*   **Notification System**: Integrated **Spring Mail** (also SendGrid) to automatically notify subscribed users of new posts or comments they follow.
*   **API & Schema Management**: Interactive REST API documentation generated via **OpenAPI**, and robust database migration management using **Flyway**.
*   **Security & Stability**: Incorporates an in-memory **Rate Limiter** to protect critical endpoints from abuse.
*   **Modern Admin Panel**: A fully customized CRUD interface for managing content, categories, and users. Includes a real-time **Markdown preview** that emulates exactly what the client will see.
*   **Dynamic Client-Side**: Frontend powered by **React** with smart features like timezone-aware comment rendering, which adapts timestamps precisely to the viewer's local time.

## 🛠️ Technology Stack

### Backend
*   **Java 21 & Spring Boot**
*   **Spring Security & Auditing, Custom Authentication Filters**
*   **Spring Data JPA**
*   **MySQL & Flyway** (Schema Registration & Migration)
*   **Spring Mail** (SendGrid Integration)
*   **OpenAPI (Swagger)**
*   **Custom Rate Limiting (In-Memory)**

### Frontend
*   **React**
*   **React-Markdown, Remark-GFM, React-Syntax-Highlighter** (for rich content rendering)

## 🏗️ Architecture & Implementation Details

The backend has been entirely retooled from legacy legacy PHP scripts into a robust, enterprise-grade Spring Boot application. This migration facilitated advanced features and a significantly more maintainable, object-oriented design.

*   **Event-Driven Enhancements**: By leveraging Spring Security Events and Async Task Executors, the system decouples critical business logic (like sending notification emails) from the main request threads.
*   **Timezone-Aware Rendering**: The backend stores all temporal data in a standardized timezone (e.g., Istanbul). The React frontend captures the user's specific timezone and handles dynamic conversions, ensuring that content dates and comment timelines are perfectly localized for users around the world.
*   **Intelligent Routing**: The React application dynamically validates requested URLs against database content to gracefully manage non-existent or malformed requests.

## 🖼️ Previews & Diagrams

### Database Design
The base schema efficiently manages posts, comments, categories, users, and notification preferences.

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

### Admin Panel (Legacy UI Highlights)
The administration panel manages content dynamically and previews Markdown precisely.

![](https://drive.google.com/uc?id=1QVpYxVbqpA7aU-f4AsU2v3dJlom5Gxnc)

<br/>

*For a full demonstration, see the legacy platform walkthrough below:*

<iframe width='560' height='315' src='https://www.youtube.com/embed/Nyqlh5KCj0M' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

### Content Management Views
![](https://drive.google.com/uc?id=1qevRXezHca7hlC26WvJd9f4VWg8kqIpi)
![](https://drive.google.com/uc?id=1IFLHm0ZlmgIuVlC-xWoW57yVkcmrgbln)
![](https://drive.google.com/uc?id=10rhhtX2v3M1x5nvKGXj1Bg5jGmaFtJFR)

### Statistics Preview
![](https://drive.google.com/uc?id=1qheFvHKWyTJVwxfHIwLBZDVn-bvyvse3)

### Client-Side Timezone Handling
Notice how the timestamps dynamically adjust to the viewing client's local time:

| Viewer A | Viewer B | 
|:---:|:---:|
| ![](https://drive.google.com/uc?id=1sw23OpEUm3n1A7jgQ-kwGdQB3r3zzHSN) | ![](https://drive.google.com/uc?id=1jYRuTE5sMaEbENZGQS2mJmRCRxHvfzBT)| 

| Post Overview A | Post Overview B | 
|:---:|:---:|
| ![](https://drive.google.com/uc?id=1SiHjdHBO-VtZ2iin3vKMAMfZ3bWUBIZR) | ![](https://drive.google.com/uc?id=1IgSKtClvksRfri5yAaigM01ayJKp1k54)| 
