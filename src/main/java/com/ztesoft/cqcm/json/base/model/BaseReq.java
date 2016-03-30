package com.ztesoft.cqcm.json.base.model;

import java.io.Serializable;

public class BaseReq implements Serializable {

	private static final long serialVersionUID = -2795231229638547908L;
	// 分页-页码
	private int page = 1;
	// 分页-每页显示数
	private int rows = 10;
	// 对应mybatis的sqlid
	private String sqlid;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getSqlid() {
		return sqlid;
	}

	public void setSqlid(String sqlid) {
		this.sqlid = sqlid;
	}

	public String toString() {
		return "page:" + this.page + ",rows:" + this.rows;
	}
}