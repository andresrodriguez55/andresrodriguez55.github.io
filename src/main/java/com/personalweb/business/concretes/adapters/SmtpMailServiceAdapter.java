package com.personalweb.business.concretes.adapters;

import com.personalweb.business.abstracts.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

@RequiredArgsConstructor
public class SmtpMailServiceAdapter extends MailService {
    @Override
    public void sendEmail(String subject, String content, String target) {
        //todo to singleton
        JavaMailSenderImpl javaMailSender = getJavaMailSender();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(super.getHostMail(), super.getName());
            mimeMessageHelper.addTo(target);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(content, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    private JavaMailSenderImpl getJavaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(getHost());
        javaMailSender.setPort(getPort());
        javaMailSender.setUsername(getHostMail());
        javaMailSender.setPassword(getPassword());

        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        props.put("mail.smtp.connectiontimeout", "10000");
        props.put("mail.smtp.timeout", "10000");
        props.put("mail.smtp.writetimeout", "10000");

        return javaMailSender;
    }
}
