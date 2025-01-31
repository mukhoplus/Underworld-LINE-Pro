package com.mukho.linepro.service;

import java.util.List;

import com.mukho.linepro.dto.user.LoginDto;
import com.mukho.linepro.dto.user.LoginUserDto;
import com.mukho.linepro.dto.user.SignupDto;
import com.mukho.linepro.dto.user.UserListDto;

public interface UserService {
    int signup(SignupDto signupDto);
    LoginUserDto login(LoginDto loginDto);
    int getUserId(String id);
    List<UserListDto> getUserList();
    boolean duplicateCheckId(String id);
    boolean duplicateCheckName(String name);
}
