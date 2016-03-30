package com.ztesoft.cqcm.json.base.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author liujw
 *
 */
public class BaseBean {

	private String beanName;
	private int beanLife;
	private String beanVersion;

	private List<String> mylist = new ArrayList<String>();
	private Map<String, Object> mymap = new HashMap<String, Object>();

	public String getBeanName() {
		return beanName;
	}

	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}

	public int getBeanLife() {
		return beanLife;
	}

	public void setBeanLife(int beanLife) {
		this.beanLife = beanLife;
	}

	public String getBeanVersion() {
		return beanVersion;
	}

	public void setBeanVersion(String beanVersion) {
		this.beanVersion = beanVersion;
	}

	public List<String> getMylist() {
		return mylist;
	}

	public void setMylist(List<String> mylist) {
		this.mylist = mylist;
	}

	public Map<String, Object> getMymap() {
		return mymap;
	}

	public void setMymap(Map<String, Object> mymap) {
		this.mymap = mymap;
	}

}
