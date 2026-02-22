package com.personalweb.configuration.async.prioritytask;

import java.util.concurrent.FutureTask;

//todo complete executor
public class FuturePriorityTask extends FutureTask<FuturePriorityTask> implements Comparable<FuturePriorityTask> {
    private final PriorityTask<?> priorityTask;

    public FuturePriorityTask(PriorityTask<?> priorityTask) {
        super(priorityTask, null);
        this.priorityTask = priorityTask;
    }

    @Override
    public int compareTo(FuturePriorityTask o) {
        return priorityTask.getJob().getPriority().compareTo(o.priorityTask.getJob().getPriority());
    }
}
