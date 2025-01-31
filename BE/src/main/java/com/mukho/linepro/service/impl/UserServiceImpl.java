package com.mukho.linepro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mukho.linepro.domain.User;
import com.mukho.linepro.dto.user.LoginDto;
import com.mukho.linepro.dto.user.LoginUserDto;
import com.mukho.linepro.dto.user.SignupDto;
import com.mukho.linepro.dto.user.UserListDto;
import com.mukho.linepro.mapper.UserMapper;
import com.mukho.linepro.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public String hashPassword(String plainPassword) {
		return passwordEncoder.encode(plainPassword);
	}

	public boolean checkPassword(String plainPassword, String hashedPassword) {
		return passwordEncoder.matches(plainPassword, hashedPassword);
	}

	@Override
	public int signup(SignupDto signupDto) {
		String plainPassword = signupDto.getPassword();
		signupDto.setPassword(hashPassword(plainPassword));
		return userMapper.signup(signupDto);
	}

	@Override
	public LoginUserDto login(LoginDto loginDto) {

		User user = userMapper.login(loginDto);
		if (user == null) {
			return null;
		}

		String plainPassword = loginDto.getPassword();
		if (!checkPassword(plainPassword, user.getPassword())) {
			return null;
		}

		int userId = user.getUserId();
		String id = user.getId();
		String name = user.getName();

		return new LoginUserDto(userId, id, name);
	}

	@Override
	public int getUserId(String id) {
		return userMapper.getUserId(id);
	}

	@Override
	public List<UserListDto> getUserList() {
		return userMapper.getUserList();
	}

	@Override
	public boolean duplicateCheckId(String id) {
		return userMapper.duplicateCheckId(id) > 0;
	}

	@Override
	public boolean duplicateCheckName(String name) {
		return userMapper.duplicateCheckName(name) > 0;
	}

}
