package com.ztesoft.cqcm.json.base.util;

import java.sql.Connection;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.executor.parameter.DefaultParameterHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.session.RowBounds;

/**
 * 数据库分页查询
 * 
 * @author liujw
 * 
 */
@Intercepts({ @Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }) })
public class PaginationInterceptor implements Interceptor {
	private static Log log = LogFactory.getLog(PaginationInterceptor.class);
	/**
	 * 分页查询-查询数据标识
	 */
	public static final String QUERY_PAGED_FLAG = "_QUERY_PAGED_FLAG_";
	/**
	 * 分页查询-查询总数标识
	 */
	public static final String QUERY_COUNT_FLAG = "_QUERY_COUNT_FLAG_";
	private String pagedSqlid;

	private static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
	private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
		MetaObject metaStatementHandler = MetaObject.forObject(statementHandler, DEFAULT_OBJECT_FACTORY, DEFAULT_OBJECT_WRAPPER_FACTORY);
		String sqlid = (String) metaStatementHandler.getValue("delegate.mappedStatement.id");
		if (!this.validSqlid(sqlid)) {
			log.debug("非查询类SQL语句");
			return invocation.proceed();
		}

		DefaultParameterHandler defaultParameterHandler = (DefaultParameterHandler) metaStatementHandler.getValue("delegate.parameterHandler");
		Object paramObject = defaultParameterHandler.getParameterObject();
		if (!(paramObject instanceof Map)) {
			log.debug("查询时未使用Map类型的参数，直接查询不拦截");
			return invocation.proceed();
		}
		@SuppressWarnings("rawtypes")
		Map parameterMap = (Map) defaultParameterHandler.getParameterObject();
		String originalSql = (String) metaStatementHandler.getValue("delegate.boundSql.sql");
		// 分页Count查询
		if (parameterMap.get(QUERY_COUNT_FLAG) != null) {
			log.debug("分页查询，统计总数");
			metaStatementHandler.setValue("delegate.boundSql.sql", this.getCountSql(originalSql));
		} else if (parameterMap.get(QUERY_PAGED_FLAG) != null) {
			RowBounds rowBounds = (RowBounds) metaStatementHandler.getValue("delegate.rowBounds");
			log.debug("分页查询，[" + rowBounds.getOffset() + "," + rowBounds.getLimit() + "]");
			metaStatementHandler.setValue("delegate.boundSql.sql", getPagedSqlOfOracle(originalSql, rowBounds.getOffset(), rowBounds.getLimit()));
			metaStatementHandler.setValue("delegate.rowBounds.offset", RowBounds.NO_ROW_OFFSET);
			metaStatementHandler.setValue("delegate.rowBounds.limit", RowBounds.NO_ROW_LIMIT);
		}
		BoundSql boundSql = statementHandler.getBoundSql();
		log.info(boundSql.getSql());
		log.info(parameterMap);
		return invocation.proceed();
	}

	@Override
	public Object plugin(Object target) {
		if (target instanceof StatementHandler) {
			return Plugin.wrap(target, this);
		} else {
			return target;
		}
	}

	@Override
	public void setProperties(Properties properties) {
		pagedSqlid = properties.getProperty("pagedSqlid", "\\.(qry|select|get|find)");
		log.debug(properties);
	}

	// [0,10],[10,10],[20,10]
	private String getPagedSqlOfOracle(String originalSql, int offset, int limit) {
		StringBuffer sql = new StringBuffer(originalSql.length() + 120);
		sql.append("SELECT * FROM (SELECT ROW_.*, ROWNUM ROWNUM_ FROM (");
		sql.append(originalSql);
		sql.append(") ROW_ WHERE ROWNUM <= ").append(offset + limit);
		sql.append(") WHERE ROWNUM_ > ").append(offset);
		return sql.toString();
	}

	@SuppressWarnings("unused")
	private String getPagedSqlOfMysql(String originalSql, int offset, int limit) {
		StringBuffer sql = new StringBuffer(originalSql.length() + 20);
		sql.append(originalSql);
		sql.append(" LIMIT ").append(offset).append(",").append(limit);
		return sql.toString();
	}

	private String getCountSql(String originalSql) {
		String countSql = "SELECT COUNT(0) AS CNT_TOTAL FROM (" + originalSql + ") CT__";
		return countSql;
	}

	private boolean validSqlid(String sqlid) {
		Pattern pattern = Pattern.compile(pagedSqlid);
		Matcher matcher = pattern.matcher(sqlid);
		if (matcher.find()) {
			return true;
		} else {
			return false;
		}
	}
}