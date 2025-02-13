package com.mukho.linepro.interceptor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mukho.linepro.util.SessionUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class SessionCheckInterceptor implements HandlerInterceptor {
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		HttpSession session = request.getSession(false);

		if (session == null || session.getAttribute("loginUser") == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			response.setCharacterEncoding("UTF-8");

			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Unauthorized access");
			errorResponse.put("status", "401");

			try {
				objectMapper.writeValue(response.getWriter(), errorResponse);
			} catch (Exception e) {
				throw new RuntimeException("Failed to write error response", e);
			}
			return false;
		}

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
		ModelAndView modelAndView) {
		SessionUtil.refreshSession(request);
	}
}
