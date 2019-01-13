package org.smallbun.fast.manage.monitor.service.impl;

import com.google.common.collect.Lists;
import org.smallbun.fast.manage.monitor.service.MonitorService;
import org.smallbun.fast.manage.monitor.vo.OnlineUserVO;
import org.smallbun.fast.manage.user.details.LoginUserDetails;
import org.smallbun.framework.security.ActiveUserStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.smallbun.fast.manage.user.util.UserUtil.getSession;

/**
 * 监控service实现
 * @author SanLi
 * Created by 2689170096@qq.com on 2019/1/13 13:51
 */
@Service
public class MonitorServiceImpl implements MonitorService {
	@Autowired
	public MonitorServiceImpl(SessionRegistry sessionRegistry, ActiveUserStore activeUserStore) {
		this.activeUserStore = activeUserStore;
		this.sessionRegistry = sessionRegistry;

	}

	/**
	 * 从会话注册表中获取用户
	 * @return {@link List < LoginUserDetails >}
	 */
	@Override
	public List<OnlineUserVO> getUsersFromSessionRegistry() {
		List<OnlineUserVO> list = Lists.newArrayList();
		sessionRegistry.getAllPrincipals().forEach(g -> sessionRegistry.getAllSessions(g, false).forEach(s -> {
			//获取登录用户
			activeUserStore.getUsers().stream().filter(u -> u.getSessionId().equals(s.getSessionId())).findAny()
					.ifPresent(t -> {
						//userDetails
						LoginUserDetails details = (LoginUserDetails) s.getPrincipal();
						list.add(OnlineUserVO.builder()
								//会话ID
								.sessionId(t.getSessionId())
								//最后操作时间
								.lastAccessTime(s.getLastRequest())
								//用户名
								.username(details.getUsername())
								//OS操作系统
								.os(t.getOs())
								//登录IP
								.logInIp(t.getLogInIp())
								//登录时间
								.logInTime(t.getLogInTime())
								//浏览器
								.browser(t.getBrowser())
								//登录地址
								.logInAddress(t.getLogInAddress())
								//归属部门
								.orgName(details.getSysUser().getOrg().getOrgName()).build());
					});
		}));
		return list;
	}

	/**
	 * 下线所有用户，除下达任务的人除外
	 */
	@Override
	public void expireUserSessions() {
		for (LoginUserDetails details : sessionRegistry.getAllPrincipals().stream().map(u -> (LoginUserDetails) u)
				.collect(Collectors.toList())) {
			//排除不是当前用户sessionId的用户
			sessionRegistry.getAllSessions(details, true).stream().filter(sessionInformation -> !sessionInformation
					.equals(sessionRegistry.getSessionInformation(getSession().getId())))
					.forEach(SessionInformation::expireNow);
		}
	}

	/**
	 * 下线指定用户
	 * @param sessionId {@link String}
	 */
	@Override
	public void expireUserSession(String sessionId) {
		sessionRegistry.getSessionInformation(sessionId).expireNow();
	}

	/**
	 * 注入sessionRegistry
	 */
	private final SessionRegistry sessionRegistry;
	/**
	 * 注入activeUserStore
	 */
	private final ActiveUserStore activeUserStore;
}
