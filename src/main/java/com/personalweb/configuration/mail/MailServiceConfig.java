package com.personalweb.configuration.mail;

import com.personalweb.business.abstracts.MailService;
import com.personalweb.business.concretes.adapters.SendGridMailServiceAdapter;
import com.personalweb.business.concretes.adapters.SmtpMailServiceAdapter;
import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailServiceConfig {
    @Value("${mailservice.sendgrid.apikey:none}")
    private String sendgridApiKey;

    @Bean
    @ConditionalOnProperty(name = "mailservice.strategy", havingValue = "smtp")
    public MailService mailSmtpServiceAdapter() {
        return new SmtpMailServiceAdapter();
    }

    @Bean
    @ConditionalOnProperty(name = "mailservice.strategy", havingValue = "sendgrid")
    public SendGrid sendGrid() {
        return new SendGrid(sendgridApiKey);
    }

    @Bean
    @ConditionalOnProperty(name = "mailservice.strategy", havingValue = "sendgrid")
    public MailService sendGridMailServiceAdapter(SendGrid sendGrid) {
        return new SendGridMailServiceAdapter(sendGrid);
    }
}
