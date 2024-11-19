package com.ssafy.withme;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableFeignClients
//TODO : Security 구현 시 security 무시 해제
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableAsync
@SpringBootApplication
public class WithmeApplication {

	public static void main(String[] args) {
		SpringApplication.run(WithmeApplication.class, args);
	}

}
