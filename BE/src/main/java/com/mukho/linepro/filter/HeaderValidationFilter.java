package com.mukho.linepro.filter;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class HeaderValidationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws
            ServletException, IOException {

        if (!("websocket".equalsIgnoreCase(request.getHeader("Upgrade")) &&
                "Upgrade".equalsIgnoreCase(request.getHeader("Connection")))) {

            String mukhoAuthToken = request.getHeader("Mukho-Auth-Token");

            if (mukhoAuthToken == null || !mukhoAuthToken.equals("Underworld")) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
