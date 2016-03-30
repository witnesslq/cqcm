package com.ztesoft.cqcm.json.base.util;

import java.util.HashMap;

import net.sf.json.JSONObject;

public class OutPutJson extends HashMap{
	
	private static String SUCCESS="00A"; //成功
	private static String FAILURE="00X"; //失败	
	
	/***
	 * 返回正常的JSON對象
	 * @Title: success
	 * @Description: TODO
	 * @author chen.yiwan
	 * @param obj
	 * @throws
	 */
	public static JSONObject success(Object obj){
		JSONObject ojson=new JSONObject();
		ojson.put("code", SUCCESS);
		ojson.put("data", JSONObject.fromObject(obj));
		return ojson;
	}
}
