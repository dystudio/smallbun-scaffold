/*
 * Copyright (c) 2011-2020, hubin (jobob@qq.com).
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.smallbun.framework.injector.methods;

import com.baomidou.mybatisplus.core.metadata.TableInfo;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlSource;
import org.smallbun.framework.injector.AbstractDataScopeLogicMethod;
import org.smallbun.framework.injector.enmus.SqlMethod;

import static org.smallbun.framework.injector.enmus.SqlMethod.SELECT_DATA_SCOPE_LIST;

/**
 * <p>
 * 根据 queryWrapper 条件查询多条数据
 * </p>
 *
 * @author hubin
 * @since 2018-06-13
 */
public class DataScopeLogicSelectList extends AbstractDataScopeLogicMethod {

	@Override
	public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?> modelClass, TableInfo tableInfo) {
		SqlMethod sqlMethod = SELECT_DATA_SCOPE_LIST;
		String sql = String.format(sqlMethod.getSql(), sqlSelectColumns(tableInfo, true),
				tableInfo.getTableName().concat(SPACE).concat(ALIAS), getPermissionConnection(),
				sqlWhereEntityWrapper(true, tableInfo));
		SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
		return addSelectMappedStatement(mapperClass, sqlMethod.getMethod(), sqlSource, modelClass,
				tableInfo);

	}
}
