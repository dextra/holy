package com.dextrasw.holy;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import com.google.appengine.api.taskqueue.dev.LocalTaskQueueCallback;
import com.google.appengine.api.urlfetch.URLFetchServicePb.URLFetchRequest;
import com.google.appengine.api.urlfetch.URLFetchServicePb.URLFetchRequest.Header;
import com.google.appengine.repackaged.com.google.protobuf.ByteString;
import com.googlecode.restitory.gae.http.HttpClientRequestService;
import com.googlecode.restitory.gae.http.Request;
import com.googlecode.restitory.gae.http.Response;
import com.googlecode.restitory.gae.http.Type;

public class TaskCallback implements LocalTaskQueueCallback {

	private static final long serialVersionUID = -1014385841687576970L;

	@Override
	public int execute(URLFetchRequest req) {
		try {

			HttpClientRequestService service = new HttpClientRequestService("http://localhost:8380");

			String path = new URI(req.getUrl()).getPath();
			Type type = Type.valueOf(req.getMethod().name());
			Request request = new Request(type, path);

			if (req.hasPayload()) {
				String text = getHeader(req, "X-Payload-Text");
				String contentType = getHeader(req, "Content-Type");
				request.setContentType(contentType);
				ByteString payload = req.getPayload();
				if (text == null) {
					request.setContent(payload.toByteArray());
				} else {
					request.setContent(payload.toString(text));
				}
			}
			Response response = service.execute(request);
			return response.getCode();
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		} catch (URISyntaxException e) {
			throw new RuntimeException(e);
		}
	}

	private String getHeader(URLFetchRequest req, String name) {
		List<Header> list = req.getHeaderList();
		for (Header header : list) {
			if (header.getKey().equals(name)) {
				return header.getValue();
			}
		}
		return null;
	}

	@Override
	public void initialize(Map<String, String> map) {
	}
}
