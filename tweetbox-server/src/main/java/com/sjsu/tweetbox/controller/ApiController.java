package com.sjsu.tweetbox.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author terasurfer
 */

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class ApiController {

    @GetMapping("status")
    @ResponseBody()
    public ResponseEntity<Map<String, Object>> getApiStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "ok 200");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
