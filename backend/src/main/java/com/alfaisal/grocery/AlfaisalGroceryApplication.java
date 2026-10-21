package com.alfaisal.grocery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AlfaisalGroceryApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlfaisalGroceryApplication.class, args);
        System.out.println("Alfaisal Grocery Store Backend is running on port 8080!");
    }
}
