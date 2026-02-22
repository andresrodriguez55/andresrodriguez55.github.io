package com.personalweb.configuration.security.filters.ratelimiter;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.concurrent.atomic.AtomicLong;

@Setter
@Getter
public class RequestInfo {
    private AtomicLong count;
    private long updatedTime;

    public RequestInfo() {
        this.count = new AtomicLong(1L);
        this.updatedTime = Instant.now().getEpochSecond();
    }

    public void resetCount() {
        count.set(1L);
    }
}
