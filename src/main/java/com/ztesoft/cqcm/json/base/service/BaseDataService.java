package com.ztesoft.cqcm.json.base.service;

import java.util.List;
import java.util.Map;

/***
 * 基础数据服务
 * @ClassName: BaseDataService
 * @Description: TODO
 * @author chen.yiwan
 * @date 2016-1-20 上午10:55:21
 *
 */
public interface BaseDataService {
	
	// 查询列表
	List<Map<String, Object>> queryForList(String key, Map<String, Object> param);
	
	// 查询单条数据
	Map<String, Object> queryForMap(String key, Map<String, Object> param);

	// 分页查询-数据和总数{"rows":,"total":}
	Map<String, Object> queryForPage(String key, Map<String, Object> param);

	// 分页查询-数据
	List<Map<String, Object>> queryForPageList(String key, Map<String, Object> param);

	// 分页查询-总数
	int queryForPageCount(String key, Map<String, Object> param);
	

}
