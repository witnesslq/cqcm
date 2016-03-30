package com.ztesoft.cqcm.json.base.service.impl;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.ztesoft.cqcm.json.base.service.BaseDataService;
import com.ztesoft.cqcm.json.base.util.PaginationInterceptor;

/***
 * 基础数据服务impl
 * @ClassName: BaseDataServiceImpl
 * @Description: TODO
 * @author chen.yiwan
 * @date 2016-1-20 上午10:56:13
 *
 */
@Service("baseDataService")
public class BaseDataServiceImpl implements BaseDataService {
	protected static Log log = LogFactory.getLog(BaseDataServiceImpl.class);
	
	@Autowired
	public SqlSessionTemplate session;
	
	@Autowired
	public JdbcTemplate jdbcTemplate;

	@Override
	public List<Map<String, Object>> queryForList(String key,
			Map<String, Object> param) {
		return session.selectList(key, param);
	}

	@Override
	public Map<String, Object> queryForMap(String key, Map<String, Object> param) {
		// TODO Auto-generated method stub
		return session.selectOne(key, param);
	}

	@Override
	public Map<String, Object> queryForPage(String key,
			Map<String, Object> param) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rows", this.queryForPageList(key, param));
		map.put("total", this.queryForPageCount(key, param));
		return map;
	}

	@Override
	public List<Map<String, Object>> queryForPageList(String key,
			Map<String, Object> param) {
		int page = 1;
		int rows = Integer.MAX_VALUE;
		try {
			Object opage = param.get("page");
			if (opage != null) {
				if (opage instanceof String) {
					page = Integer.parseInt((String) opage);
				} else if (opage instanceof Number) {
					page = ((Number) opage).intValue();
				}
			}
		} catch (Exception e) {
		} finally {
			if (page < 1) {
				page = 1;
			}
		}
		try {
			Object orows = param.get("rows");
			if (orows != null) {
				if (orows instanceof String) {
					rows = Integer.parseInt((String) orows);
				} else if (orows instanceof Number) {
					rows = ((Number) orows).intValue();
				}
			}
		} catch (Exception e) {
		} finally {
			if (rows < 1) {
				rows = Integer.MAX_VALUE;
			}
		}
		// 分页查询-查询数据
		param.put(PaginationInterceptor.QUERY_PAGED_FLAG, true);
		List<Map<String, Object>> list = session.selectList(key, param, new RowBounds((page - 1) * rows, rows));
		param.remove(PaginationInterceptor.QUERY_PAGED_FLAG);
		return list;
	}

	@Override
	public int queryForPageCount(String key, Map<String, Object> param) {
		Collection<String> mappedStatementNames = session.getConfiguration().getMappedStatementNames();
		int cnt = 0;
		if (mappedStatementNames.contains(key + "Count")) {
			log.debug("存在分页查询总数SQL:" + key + "Count,直接使用");
			Object ret = session.selectOne(key + "Count", param);
			if (ret instanceof Map) {
				Map<String, BigDecimal> retmap = (Map<String, BigDecimal>) ret;
				cnt = retmap.get("CNT_TOTAL").intValue();
			} else {
				cnt = Integer.parseInt(ret.toString());
			}
		} else {
			// 分页查询-查询总数
			param.put(PaginationInterceptor.QUERY_COUNT_FLAG, true);
			Map<String, BigDecimal> ret = session.selectOne(key, param);
			cnt = ret.get("CNT_TOTAL").intValue();
			param.remove(PaginationInterceptor.QUERY_COUNT_FLAG);
		}
		return cnt;
	}

}
