package com.personalweb.configuration.security.filters.context;

public final class ContextHolder {
    private static final ThreadLocal<SessionInformation> context = ThreadLocal.withInitial(SessionInformation::new);

    public static boolean isAuthenticated() {
        return ContextHolder.getSessionInformation().isAuthenticated();
    }

    public static SessionInformation getSessionInformation() {
        return context.get();
    }

    public static void clear() {
        context.remove();
    }
}
