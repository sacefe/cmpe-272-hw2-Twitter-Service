package com.sjsu.tweetbox;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author terasurfer
 */

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    public void configure(HttpSecurity security) throws Exception {
        security.httpBasic().disable();
        security
                .cors()
                .and()
                .csrf()
                .and()
                .formLogin()
                .disable()
                .authorizeRequests()
                .antMatchers("/api/v1/*")
                .permitAll();
    }

}
