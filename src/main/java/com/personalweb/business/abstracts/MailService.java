package com.personalweb.business.abstracts;

import com.personalweb.data.entities.Comment;
import com.personalweb.data.entities.Post;
import com.personalweb.utils.constants.Mail;
import com.personalweb.utils.constants.Url;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

//TODO: fix paths
public abstract class MailService {
    private static final String NAME = "Andres Personal Website";
    private static final String POST_SUBJECT = "New Post of Andres's Blog!";
    private static final String COMMENT_REPLY_SUBJECT = "You received a reply of %s in the post '%s'";

    @Value("${mailservice.host}")
    private String host;

    @Value("${mailservice.hostmail}")
    private String hostMail;

    @Value("${mailservice.password}")
    private String password;

    @Value("${mailservice.port:0}")
    private int port;

    @Async(value = "emailExecutor")
    public abstract void sendEmail(String emailSubject, String emailContent, String toEmail);

    //TODO: optimize
    @Transactional
    public String buildEmailNewPostContent(Post post) {
        String imageUrl = post.getCoverPhotoLink() != null ? post.getCoverPhotoLink() : "";
        String title = post.getTitle() != null ? post.getTitle() : "";
        String categoryName = post.getCategory() != null ? post.getCategory().getName() : "";
        String date = post.getDate() != null ? post.getDate().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")) : "";
        String postUrl = Url.getPostUrl(post.getId(), post.getTitle());
        String unsubscribeUrl = ""; //TODO

        String emailContent = Mail.POST_CONTENT_TEMPLATE; //readEmailTemplate(LocalPaths.newPostTemplatePath);
        emailContent = emailContent.replace("{{ imageUrl }}", imageUrl)
                .replace("{{ title }}", title)
                .replace("{{ category }}", categoryName)
                .replace("{{ date }}", date)
                .replace("{{ postUrl }}", postUrl)
                .replace("{{ unsubscribeUrl }}", unsubscribeUrl);

        return emailContent;
    }

    public String buildEmailCommentReplyContent(Comment ancestorComment, Comment replyComment, Post post) {
        String sourceCommentNick = ancestorComment.getNickname() != null ? ancestorComment.getNickname() : "";
        String sourceCommentContent = ancestorComment.getContent() != null ? ancestorComment.getContent() : "";
        String newCommentNick = replyComment.getNickname() != null ? replyComment.getNickname() : "";
        String newCommentContent = replyComment.getContent() != null ? replyComment.getContent() : "";
        String postUrl = Url.getPostUrl(post.getId(), post.getTitle());

        String emailContent = Mail.COMMENT_REPLY_CONTENT; //readEmailTemplate(LocalPaths.commentReplyTemplatePath);
        emailContent = emailContent.replace("{{ sourceCommentNick }}", sourceCommentNick)
                .replace("{{ sourceCommentContent }}", sourceCommentContent)
                .replace("{{ newCommentNick }}", newCommentNick)
                .replace("{{ newCommentContent }}", newCommentContent)
                .replace("{{ postUrl }}", postUrl);

        return emailContent;
    }

    private String readEmailTemplate(String templatePath) {
        try {
            ClassPathResource resource = new ClassPathResource(templatePath);
            try (InputStream inputStream = resource.getInputStream()) {
                List<String> lines = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                        .lines()
                        .collect(Collectors.toList());
                return String.join("\n", lines);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public String getName() {
        return NAME;
    }

    public String getHost() {
        return host;
    }

    public String getHostMail() {
        return hostMail;
    }

    public String getPassword() {
        return password;
    }

    public int getPort() {
        return port;
    }

    public String getNewPostSubject() {
        return POST_SUBJECT;
    }

    public String buildCommentReplySubject(String replyNick, String postTitle) {
        return COMMENT_REPLY_SUBJECT.formatted(replyNick, postTitle);
    }
}