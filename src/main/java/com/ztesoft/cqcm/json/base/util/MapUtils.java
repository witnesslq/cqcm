package com.ztesoft.cqcm.json.base.util;

import java.util.HashMap;
import java.util.Map;

public class MapUtils {
	public static String getStringValue(Map<String, Object> map, String key) {
		if (!map.containsKey(key)) {
			return "";
		}
		return map.get(key).toString();
	}

	public static int getIntValue(Map<String, Object> map, String key) {
		if (!map.containsKey(key)) {
			return 0;
		}
		try {
			return Integer.parseInt(map.get(key).toString());
		} catch (NumberFormatException e) {
			return 0;
		}
	}

	public static long getLongValue(Map<String, Object> map, String key) {
		if (!map.containsKey(key)) {
			return 0;
		}
		try {
			return Long.parseLong(map.get(key).toString());
		} catch (NumberFormatException e) {
			return 0;
		}
	}

	public static Map<String, Object> newParam() {
		return new HashMap<String, Object>();
	}
}
