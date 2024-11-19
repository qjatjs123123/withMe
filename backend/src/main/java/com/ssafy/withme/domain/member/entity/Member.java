package com.ssafy.withme.domain.member.entity;

import com.ssafy.withme.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE member SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "boolean default false")
    private Boolean isDeleted = false;

    @Builder
    public Member(String username, Provider provider) {
        this.username = username;
        this.provider = provider;
    }
}
