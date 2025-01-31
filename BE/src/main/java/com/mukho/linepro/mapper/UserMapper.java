package com.mukho.linepro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.linepro.dto.user.LoginDto;
import com.mukho.linepro.dto.user.SignupDto;
import com.mukho.linepro.domain.User;
import com.mukho.linepro.dto.user.UserListDto;

@Mapper
public interface UserMapper {
    int signup(SignupDto signupDto);
    User login(LoginDto loginDto);
    int getUserId(String id);
    List<UserListDto> getUserList();
    int duplicateCheckId(String id);
    int duplicateCheckName(String name);
    String getName(int id);
}
