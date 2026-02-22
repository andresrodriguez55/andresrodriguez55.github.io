package com.personalweb.business.concretes.adapters;

import com.personalweb.business.abstracts.MailService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SendGridMailServiceAdapter extends MailService {
    private final static String CONTENT_TYPE = "text/html";
    private final static String MAIL_SEND = "mail/send";

    private final SendGrid sendGrid;

    @Override
    public void sendEmail(String emailSubject,
                          String emailContent,
                          String toEmail) {
        Email from = new Email(super.getHostMail(), super.getName());
        Content content = new Content(CONTENT_TYPE, emailContent);
        Email to = new Email(toEmail);
        Mail mail = new Mail(from, emailSubject, to, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint(MAIL_SEND);
            request.setBody(mail.build());
            sendGrid.api(request);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
