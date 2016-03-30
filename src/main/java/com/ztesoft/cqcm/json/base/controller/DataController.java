package com.ztesoft.cqcm.json.base.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ztesoft.common.util.DesEncrypt;
import com.ztesoft.cqcm.json.base.model.BaseRes;
import com.ztesoft.cqcm.json.base.service.BaseDataService;

@Controller
@RequestMapping(value = "/json_intf")
public class DataController {
	protected static Log log = LogFactory.getLog(DataController.class);
	
	@Autowired
	protected BaseDataService baseDataService;

	//查询SQLID
	private final static String SQL_ID="com.ztesoft.cqcm.json.base.mapper.";
	private final static String PARAM_KEY_SQLID = "sqlid";

	/***
	 * 测试连接是否正常
	 * 
	 * @Title: test
	 * @Description: TODO
	 * @author chen.yiwan
	 * @param request
	 * @return
	 * @throws
	 */
	@RequestMapping(value = "/test", method = { RequestMethod.GET,RequestMethod.POST })
	@ResponseBody
	public BaseRes test(HttpServletRequest request) {
		Map<String, Object> paramMap = getParameterMap(request);
		Map<String, Object> retMap = baseDataService.queryForMap(SQL_ID+"BaseDataMapper.test",paramMap);
		return BaseRes.getSuccess(retMap);
	}
	
	/***
	 * 获取单行数据
	 * @Title: queryData
	 * @Description: TODO
	 * @author chen.yiwan
	 * @param request
	 * @return
	 * @throws
	 */
	@RequestMapping(value = "/getOne", method = { RequestMethod.GET,RequestMethod.POST })
	@ResponseBody
	public BaseRes getOne(HttpServletRequest request)
	{
		Map<String, Object> paramMap = getParameterMap(request);
		Map<String, Object> retMap = baseDataService.queryForMap(SQL_ID+paramMap.get(PARAM_KEY_SQLID),paramMap);
		return BaseRes.getSuccess(retMap);
	}
	
	
	/***
	 * 获取列表数据
	 * @Title: getList
	 * @Description: TODO
	 * @author chen.yiwan
	 * @param request
	 * @return
	 * @throws
	 */
	@RequestMapping(value = "/getList", method = { RequestMethod.GET,RequestMethod.POST })
	@ResponseBody
	public BaseRes getList(HttpServletRequest request)
	{
		Map<String, Object> paramMap = getParameterMap(request);
		List<Map<String, Object>> list = baseDataService.queryForList(SQL_ID+paramMap.get(PARAM_KEY_SQLID),paramMap);
		return BaseRes.getSuccess(list);
	}
	


	/**
	 * 获取前台参数
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getParameterMap(HttpServletRequest request) {
		// 分析angularJS $http.post的参数
		Map<String, Object> postParamMap = new HashMap<String, Object>();
		String method = request.getMethod();
		if ("POST".equalsIgnoreCase(method)) {
			try {
				ServletInputStream sis = request.getInputStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(
						sis, "utf-8"));
				StringBuilder sb = new StringBuilder();
				String line = null;
				while ((line = br.readLine()) != null) {
					sb.append(line);
				}
				if (sb.length() > 0) {
					String postParamStr = sb.toString();
					ObjectMapper om = new ObjectMapper();
					postParamMap = om.readValue(postParamStr, Map.class);
					log.debug("postParamMap:" + postParamStr);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// 处理普通get,post类型的参数
		Map<String, Object> retMap = new HashMap<String, Object>();
		Map<String, Object> paramMap = request.getParameterMap();
		Set<String> paramKeys = paramMap.keySet();
		for (String key : paramKeys) {
			Object originalValue = paramMap.get(key);
			if (originalValue.getClass().isArray()) {
				Object[] values = (Object[]) originalValue;
				if (values.length == 1) {
					if (values[0] != null && values[0].toString().length() > 0) {
						try {
							retMap.put(key, URLDecoder.decode(
									values[0].toString(), "utf-8"));
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
					}
				} else if (values.length > 1) {
					retMap.put(key, Arrays.asList(values));
				}
			}
		}
		retMap.putAll(postParamMap);
		return retMap;
	}

	
	/**
	 * 通用异常处理
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	// @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody BaseRes handleException(Exception ex) {
		BaseRes res = BaseRes.getFailure();
		res.setDesc(ex.getMessage());
		return res;
	}

}