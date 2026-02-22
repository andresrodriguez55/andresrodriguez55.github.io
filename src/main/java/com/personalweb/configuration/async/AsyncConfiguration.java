package com.personalweb.configuration.async;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

@EnableAsync
@Configuration
public class AsyncConfiguration implements AsyncConfigurer {
    @Override
    public Executor getAsyncExecutor() { //todo case of study
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //todo decorator
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setCorePoolSize(5); //todo app prop
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("Async-"); //todo app prop
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.AbortPolicy());
        executor.initialize();
        return executor;
    }

    @Bean("authenticationLogExecutor")
    public Executor getAuthenticationLogExecutor() { //todo case of study
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //todo decorator
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setCorePoolSize(3); //todo app prop
        executor.setMaxPoolSize(6);
        executor.setQueueCapacity(30);
        executor.setThreadNamePrefix("Authentication-Log-Async-"); //todo app prop
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Bean(name = "notifierExecutor")
    public Executor getNotifierExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        //todo decorator
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setCorePoolSize(2); //todo app prop
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(20);
        executor.setThreadNamePrefix("Notifier-Async-"); //todo app prop
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();

        return executor;
    }


    @Bean(name = "emailExecutor")
    public Executor getEmailExecutor() { //todo case of study
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //todo decorator
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setCorePoolSize(3); //todo app prop
        executor.setMaxPoolSize(8);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("Email-Async-"); //todo app prop
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }
}
