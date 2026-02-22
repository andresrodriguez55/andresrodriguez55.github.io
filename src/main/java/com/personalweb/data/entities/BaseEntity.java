package com.personalweb.data.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

//todo db sync - listiner for auditing - mappers - security optimization
@SuperBuilder
@AllArgsConstructor
@Data
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {
    public static final String ID = "id";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @CreationTimestamp
//    @Column(updatable = false)
//    private Timestamp createdDate;
//
//    @UpdateTimestamp
//    private Timestamp updatedDate;
//
//    private String createdBy;
}
