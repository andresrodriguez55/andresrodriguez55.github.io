package com.personalweb.utils.constants;

//todo refactoring
public class Url {
    public static final String FRONTEND_URL = "https://andresrodriguez55.github.io/#";
    public static final String POST_URI = "/post/%d/%s";

    public static String getPostUrl(Long id, String title) {
        return Url.FRONTEND_URL + String.format(Url.POST_URI, id, title);
    }
}
