package com.personalweb.configuration.async.prioritytask;

import lombok.Getter;

import java.util.function.Consumer;

public class PriorityTask<J extends Priority> implements Runnable {
    private final Consumer<J> jobConsumer;
    @Getter
    private final J job;

    public PriorityTask(Consumer<J> jobConsumer, J job) {
        this.jobConsumer = jobConsumer;
        this.job = job;
    }

    @Override
    public void run() {
        this.jobConsumer.accept(job);
    }
}
