package com.ztesoft.cqcm.json.base.model;

import java.io.Serializable;

//@JsonInclude(Include.NON_NULL)
public class BaseRes implements Serializable {
	private static final long serialVersionUID = -1910116263806311190L;

	public static final String SUCCESS_CODE = "0000";
	public static final String FAILURE_CODE = "9000";
	public static final String SUCCESS_DESC = "成功";
	public static final String FAILURE_DESC = "失败";

	public static BaseRes getSuccess() {
		return getSuccess(null, 0);
	}

	public static BaseRes getSuccess(Object data) {
		return getSuccess(data, 0);
	}

	public static BaseRes getSuccess(Object data, long time) {
		return new BaseRes(SUCCESS_CODE, SUCCESS_DESC, data, time);
	}

	public static BaseRes getFailure() {
		return new BaseRes(FAILURE_CODE, FAILURE_DESC, null, 0);
	}

	private String code;
	private String desc;
	private Object data;
	private long time;

	public BaseRes() {
		this.code = SUCCESS_CODE;
		this.desc = SUCCESS_DESC;
	}

	private BaseRes(String code, String desc, Object data, long time) {
		this.code = code;
		this.desc = desc;
		this.data = data;
		this.time = time;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

}