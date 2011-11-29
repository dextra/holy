package com.dextrasw.holy;

import org.junit.After;
import org.junit.Before;

public class GAETestCase {

	protected GAETestHelper helper;

	@Before
	public void setUp() throws Exception {
		helper = new GAETestHelper();
		helper.prepareLocalServiceTestHelper();
		helper.setUp();

	}

	@After
	public void tearDown() {
		if (helper != null) {
			helper.tearDown();
		}
	}

}
