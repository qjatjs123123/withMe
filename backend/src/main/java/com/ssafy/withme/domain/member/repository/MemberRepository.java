package com.ssafy.withme.domain.member.repository;

import com.ssafy.withme.domain.member.entity.Member;
import com.ssafy.withme.domain.member.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUsernameAndProvider(String username, Provider provider);
}
