package com.dextrasw.holy;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EchoServlet extends HttpServlet {

	private static final long serialVersionUID = -7786416896693773207L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String msg = req.getParameter("msg");
		String sleep = req.getParameter("sleep");

		if (sleep != null && sleep.trim().length() > 0) {
			try {
				Thread.sleep(Long.parseLong(sleep));
			} catch (NumberFormatException e) {
				throw new RuntimeException(e);
			} catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
		}

		resp.setContentType("text/plain");
		resp.getWriter().println(msg);

	}

}
