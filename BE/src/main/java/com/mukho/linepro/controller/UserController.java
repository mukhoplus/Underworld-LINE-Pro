package com.mukho.linepro.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukho.linepro.dto.user.LoginDto;
import com.mukho.linepro.dto.user.LoginUserDto;
import com.mukho.linepro.dto.user.SignupDto;
import com.mukho.linepro.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    private static Map<Integer, Integer> customSession = new ConcurrentHashMap<>();

    public void setSession(HttpServletRequest request, LoginUserDto loginUserDto) {
        HttpSession session = request.getSession();
        session.setAttribute("loginUser", loginUserDto);
        session.setMaxInactiveInterval(30 * 60);
    }

    public static void httpSessionDestroyed(HttpSession session) {
        LoginUserDto loginUserDto = (LoginUserDto) session.getAttribute("loginUser");

        try {
            int userId = loginUserDto.getUserId();

            if (customSession.containsKey(userId)) {
                customSession.remove(userId);
            }
        } catch (Exception e) {

        }
    }

    @GetMapping("/session")
    public ResponseEntity<?> session(HttpServletRequest request) {
        HttpSession session = request.getSession();

        try {
            LoginUserDto loginUserDto = (LoginUserDto) session.getAttribute("loginUser");
            if (loginUserDto == null) {
                throw new Exception();
            }
            return ResponseEntity.ok(loginUserDto.getUserId());
        } catch (Exception e) {
            return ResponseEntity.ok(0);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDto signupDto, HttpServletRequest request) {
        try {
            if (userService.signup(signupDto) == 0) {
                throw new Exception();
            }

            int userId = userService.getUserId(signupDto.getId());
            String id = signupDto.getId();
            String name = signupDto.getName();

            LoginUserDto loginUserDto = new LoginUserDto(userId, id, name);
            setSession(request, loginUserDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpServletRequest request) {
        try {
            LoginUserDto loginUserDto = userService.login(loginDto);

            if (loginUserDto == null) {
                return ResponseEntity.ok().body(HttpStatus.UNAUTHORIZED.toString());
            }

            if (customSession.containsKey(loginUserDto.getUserId())) {
                return ResponseEntity.ok().body(HttpStatus.CONFLICT.toString());
            }

            setSession(request, loginUserDto);

            int userId = loginUserDto.getUserId();
            customSession.put(userId, userId);

            return ResponseEntity.ok(loginUserDto);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            session.invalidate();
            // 컴포넌트 이동 -> 소켓 세션 연결 끊기 -> 세션 정보 제거 : 버그 발견
        } catch (Exception e) {

        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList() {
        try {
            return ResponseEntity.ok(userService.getUserList());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> duplicateCheckId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.duplicateCheckId(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> duplicateCheckName(@PathVariable String name) {
        try {
            return ResponseEntity.ok(userService.duplicateCheckName(name));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
