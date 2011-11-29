package com.dextrasw.holy;

import org.junit.After;
import org.junit.Before;

import com.googlecode.restitory.gae.http.HttpClientRequestService;
import com.googlecode.restitory.gae.http.RequestAdapter;
import com.googlecode.restitory.gae.http.RequestService;

public class AbstractTestCase {

	protected GAETestHelper helper;

	protected RequestService service;

	protected RequestAdapter adapter;

	@Before
	public void setUp() throws Exception {
		helper = new GAETestHelper();
		helper.prepareLocalServiceTestHelper();
		helper.bootMycontainer();

		service = new HttpClientRequestService("http://localhost:8380");
		adapter = new RequestAdapter(service);
	}

	@After
	public void tearDown() {
		if (helper != null) {
			helper.shutdownMycontainer();
		}
	}

}
