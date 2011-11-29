package com.dextrasw.holy;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogFilter implements Filter {

	private static final Logger LOG = LoggerFactory.getLogger(LogFilter.class);

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		LOG.info("Init");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		LOG.info(toString((HttpServletRequest) request));
		chain.doFilter(request, response);
	}

	private String toString(HttpServletRequest request) {
		StringBuilder sb = new StringBuilder();
		String user = "null";
		Principal principal = request.getUserPrincipal();
		if (principal != null) {
			user = principal.getName();
		}
		sb.append('[').append(user).append("] ").append(request.getMethod())
				.append(" ").append(request.getRequestURI()).append('?')
				.append(request.getQueryString()).append(" ")
				.append(request.getContentType()).append(" ")
				.append(request.getContentLength());
		return sb.toString();
	}

	@Override
	public void destroy() {
		LOG.info("Destroy");
	}

}
