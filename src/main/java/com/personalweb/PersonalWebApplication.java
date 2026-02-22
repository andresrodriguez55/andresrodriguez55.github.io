package com.personalweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@SpringBootConfiguration
//@EnableAutoConfiguration
//@Import(MainConfiguration.class)
public class PersonalWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(PersonalWebApplication.class, args);
    }
}
