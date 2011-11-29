package com.dextrasw.holy;

import static org.junit.Assert.assertEquals;

import org.junit.Ignore;
import org.junit.Test;

import com.google.gson.JsonObject;

public class BasicServletTest extends AbstractTestCase {

	@Test
	public void testNotFound() {
		assertEquals(404, adapter.code("GET", "/notfound"));
		assertEquals(404, adapter.code("GET", "/basic/notfound"));
	}

	@Test
	@Ignore
	public void testUser() {
		assertEquals(404, adapter.code("GET", "/r/user/6"));

		JsonObject user = adapter.content("GET", "/r/user/10").getJson()
				.getAsJsonObject();
		assertEquals("10", user.get("id").getAsString());
		assertEquals("test@example.com", user.get("email").getAsString());
		assertEquals("test", user.get("nick").getAsString());

		user = adapter.content("GET", "/basic/user").getJson()
				.getAsJsonObject();
		assertEquals("10", user.get("id").getAsString());
		assertEquals("test@example.com", user.get("email").getAsString());
		assertEquals("test", user.get("nick").getAsString());
	}

}
