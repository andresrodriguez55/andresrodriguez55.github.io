package com.personalweb.utils.constants;

public class Messages {
    public static class User {
        public static final String NotExists = "USER_NOT_EXISTS";
    }

    public static class Category {
        public static final String NotExists = "CATEGORY_NOT_EXISTS";
        public static final String Exists = "CATEGORY_ALREADY_EXISTS";
    }

    public static class Comment {
        public static final String NotExists = "COMMENT_NOT_EXISTS";
        public static final String Exists = "COMMENT_ALREADY_EXISTS";
        public static final String EmailNotValid = "EMAIL_MUST_MATCH_THE_PATTERN";
        public static final String SelfParentIsNotValid = "SELF_PARENT_IS_NOT_VALID";
    }

    public static class Post {
        public static final String NotExists = "POST_NOT_EXISTS";
        public static final String Exists = "POST_ALREADY_EXISTS";
    }

    public static class SubscribedEmail {
        public static final String NotExists = "SUBSCRIBED_EMAIL_NOT_EXISTS";
        public static final String Exists = "SUBSCRIBED_EMAIL_ALREADY_EXISTS";
        public static final String EmailNotValid = "EMAIL_MUST_MATCH_THE_PATTERN";
    }
}
