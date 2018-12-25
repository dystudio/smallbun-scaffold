package org.smallbun.fast.manage.dict.service;

import org.smallbun.fast.manage.dict.entity.SysDictTypeEntity;
import org.smallbun.framework.base.BaseService;
import org.smallbun.framework.result.AjaxResult;

/**
 * 系统字典类型 服务类
 * @author SanLi
 * Created by 2689170096@qq.com on 2018/10/2
 */
public interface SysDictTypeService extends BaseService<SysDictTypeEntity> {

	/**
	 * 唯一
	 * @param dictType dictType
	 * @return AjaxResult
	 */
	AjaxResult unique(SysDictTypeEntity dictType);
}