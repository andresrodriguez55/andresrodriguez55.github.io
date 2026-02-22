package com.personalweb.data.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "subscribed_emails")
public class SubscribedEmail extends BaseEntity {
    public final static String DATE = "date";

    private String email;
    private LocalDateTime date;
}
