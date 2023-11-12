package com.cae.agenda.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class routes {

    @GetMapping("/")
    public String olaSpring() {
        return "Olá com Spring Boot";
    }
    
    
}
