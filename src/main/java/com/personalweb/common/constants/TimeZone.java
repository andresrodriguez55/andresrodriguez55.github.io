package com.personalweb.common.constants;

public enum TimeZone {
    ISTANBUL("Europe/Istanbul");

    private final String value;

    private TimeZone(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
