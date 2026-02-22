package com.personalweb.configuration.security.filters.context;

import lombok.Data;

@Data
public class SessionInformation {
    private String username;
    private boolean authenticated;

    public SessionInformation() {
        authenticated = false;
    }
}
