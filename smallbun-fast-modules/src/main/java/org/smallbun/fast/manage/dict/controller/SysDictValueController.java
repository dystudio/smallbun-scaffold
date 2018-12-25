package org.smallbun.fast.manage.dict.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.smallbun.fast.manage.dict.entity.SysDictValueEntity;
import org.smallbun.fast.manage.dict.service.SysDictValueService;
import org.smallbun.fast.manage.dict.vo.SysDictValueVO;
import org.smallbun.framework.annotation.SystemLog;
import org.smallbun.framework.base.BaseController;
import org.smallbun.framework.result.AjaxResult;
import org.smallbun.framework.result.PageableResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.constraints.NotNull;
import java.util.List;

import static org.smallbun.framework.toolkit.AutoMapperUtil.mapping;

/**
 * 系统字典数据 前端控制器
 * @author SanLi
 * Created by 2689170096@qq.com on 2018/10/2
 */
@RestController
@RequestMapping("/dict/value")
public class SysDictValueController extends BaseController {


	@Autowired
	public SysDictValueController(SysDictValueService sysDictValueService) {
		this.sysDictValueService = sysDictValueService;
	}

	@ModelAttribute
	protected SysDictValueVO model(String id) {
		return StringUtils.isEmpty(id) ?
				new SysDictValueVO() :
				mapping(sysDictValueService.getById(id), new SysDictValueVO());
	}

	/**
	 * form表单
	 * @return 地址
	 */
	@SystemLog(value = "")
	@GetMapping(value = {"", "/"})
	public ModelAndView dictType(SysDictValueVO vo, Model model) {
		model.addAttribute("vo", vo);
		return new ModelAndView("/modules/manage/dict/dict_value_list.html");
	}

	/**
	 * form表单
	 * @return 地址
	 */
	@SystemLog(value = "")
	@GetMapping(value = "/form")
	public ModelAndView form(SysDictValueVO vo, Model model) {
		model.addAttribute("dictValue", vo);
		return new ModelAndView("/modules/manage/dict/dict_value_form.html");
	}

	/**
	 * 保存或更新
	 * @param vo 类型实体对象
	 * @return AjaxResult
	 */
	@SystemLog(value = "")
	@PostMapping(value = "/saveOrUpdate")
	public AjaxResult saveOrUpdate(SysDictValueVO vo) {
		return AjaxResult.builder().result(sysDictValueService.saveOrUpdate(vo)).build();
	}

	/**
	 * 删除单条记录
	 * @param id 主键ID
	 * @return AjaxResult
	 */
	@SystemLog(value = "")
	@PostMapping(value = "/removeById")
	public AjaxResult removeById(@NotNull String id) {
		return AjaxResult.builder().result(sysDictValueService.removeById(id)).build();
	}

	/**
	 * 删除多条记录
	 * @param id 主键ID集合
	 * @return AjaxResult
	 */
	@SystemLog(value = "")
	@PostMapping(value = "/removeByIds")
	public AjaxResult saveOrUpdate(@NotNull List<String> id) {
		return AjaxResult.builder().result(sysDictValueService.removeByIds(id)).build();
	}

	/**
	 * 查询全部
	 * @return AjaxResult
	 */
	@SystemLog(value = "")
	@PostMapping(value = "/list")
	public AjaxResult list(QueryWrapper<SysDictValueEntity> wrapper, SysDictValueVO vo) {
		return AjaxResult.builder().result(sysDictValueService.list(wrapper)).build();
	}

	/**
	 * 分页查询
	 * @return PageableResult
	 */
	@SystemLog(value = "")
	@PostMapping(value = "/page")
	public PageableResult page(Page<SysDictValueEntity> page, SysDictValueVO vo) {
		return PageableResult.builder().page(sysDictValueService.page(page, vo)).build();
	}

	/**
	 * 唯一
	 * @param vo vo
	 * @return AjaxResult
	 */
	@PostMapping(value = "/unique")
	public AjaxResult unique(SysDictValueVO vo) {
		return sysDictValueService.unique(vo);
	}


	/**
	 * 注入字典值业务逻辑接口
	 */
	private final SysDictValueService sysDictValueService;
}