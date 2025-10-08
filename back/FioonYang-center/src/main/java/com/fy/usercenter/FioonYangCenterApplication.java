package com.fy.usercenter;

import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.fy.usercenter.mapper")
@EnableKnife4j
public class FioonYangCenterApplication {

    public static void main(String[] args) {
        SpringApplication.run(FioonYangCenterApplication.class, args);
    }

}
