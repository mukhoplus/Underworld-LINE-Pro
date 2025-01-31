package com.mukho.linepro.util;

import com.mukho.linepro.dto.user.LoginUserDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class SessionUtil {
	public static void refreshSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);

		if (session == null)
			return;

		LoginUserDto loginUser = (LoginUserDto)session.getAttribute("loginUser");
		if (loginUser == null)
			return;

		session.setMaxInactiveInterval(30 * 60);
	}
}
