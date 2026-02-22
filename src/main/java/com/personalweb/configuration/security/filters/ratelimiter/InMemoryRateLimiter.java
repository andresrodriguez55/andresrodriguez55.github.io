package com.personalweb.configuration.security.filters.ratelimiter;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
@Setter
public class InMemoryRateLimiter {
    @Value("${inmemoryratelimiter.maxrequests:10}")
    private int MAX_REQUESTS;

    @Value("${inmemoryratelimiter.windowsizeinseconds:1L}")
    private long WINDOW_SIZE_IN_SECONDS;

    public ConcurrentMap<String, RequestInfo> requestLookup = new ConcurrentHashMap<>();

    public boolean isAllowed(String clientUniqueIdentifier) {
        RequestInfo requestInfo = requestLookup.computeIfAbsent(clientUniqueIdentifier,
                cui -> new RequestInfo());

        synchronized (requestInfo) {
            long currentTime = Instant.now().getEpochSecond();

            if (currentTime - requestInfo.getUpdatedTime() > WINDOW_SIZE_IN_SECONDS) {
                requestInfo.resetCount();
                requestInfo.setUpdatedTime(currentTime);
                return true;
            }

            if (requestInfo.getCount().incrementAndGet() <= MAX_REQUESTS) {
                return true;
            }
            return false;
        }
    }

    @Scheduled(fixedRateString = "${inmemoryratelimiter.cleanupinterval:3000}")
    public void cleanupOldEntries() {
        final long currentTime = Instant.now().getEpochSecond();
        requestLookup.entrySet()
                .stream()
                .filter(entry -> (currentTime - entry.getValue().getUpdatedTime() > WINDOW_SIZE_IN_SECONDS))
                .forEach(entry -> requestLookup.remove(entry.getKey()));
    }
}
