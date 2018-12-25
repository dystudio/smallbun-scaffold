/*
 * Copyright [2018] [左庆港]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = function () {


    var basePath = './';

    var imgPath = 'common/img/';

    var pluginsPath = 'common/plugins/';

    var cssPath = 'common/css/';
    /**
     * 初始化内容页layout组件高度
     * @returns {number}
     */
    var handleIframeLayoutHeight = function () {
        var height = App.getViewPort().height - $('.main-footer').outerHeight() - $('.main-header').outerHeight() - $(".content-tabs").outerHeight();
        return height;
    };
    /**
     * 初始化iframe内容页高度
     */
    var handleIframeLayoutContent = function () {
        var height = App.getViewPort().height - $('.main-footer').outerHeight() - $('.main-header').outerHeight() - $(".content-tabs").outerHeight();
        $(".content-iframe").css({
            height: height
        });
        $(".tab_iframe").css({
            height: height
        });
        $(".tab_iframe").css({
            width: "100%"
        });
    };
    /**
     * 处理全屏
     */
    var handleFullScreen = function () {
        var docElm = document.documentElement;

        //W3C
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

    };
    /**
     * 退出全屏
     */
    var exitFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };
    /**
     * 使用jQuery iCheck插件处理自定义复选框和收音机
     */
    var handleiCheck = function () {
        if (!$().iCheck) {
            return;
        }

        $(".icheck").each(function () {
            var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
            var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';

            if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
                $(this).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: radioClass,
                    insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
                });
            } else {
                $(this).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: radioClass
                });
            }
        });
    };

    /**
     * 处理引导程序开关
     */
    var handleBootstrapSwitch = function () {
        if (!$().bootstrapSwitch) {
            return;
        }
        $('.make-switch').bootstrapSwitch();
    };

    /**
     * 处理Bootstrap确认
     */
    var handleBootstrapConfirmation = function () {
        if (!$().confirmation) {
            return;
        }
        $('[data-toggle=confirmation]').confirmation({
            container: 'body',
            btnOkClass: 'btn btn-sm btn-success',
            btnCancelClass: 'btn btn-sm btn-danger'
        });
    };

    /**
     * 处理Bootstrap手风琴
     */
    var handleAccordions = function () {
        $('body').on('shown.bs.collapse', '.accordion.scrollable', function (e) {
            App.scrollTo($(e.target));
        });
    };

    /**
     * 处理Bootstrap选项卡
     */
    var handleTabs = function () {
        /**
         * 如果URL中提供了选项卡ID，请激活选项卡
         */
        if (location.hash) {
            var tabId = encodeURI(location.hash.substr(1));
            $('a[href="#' + tabId + '"]').parents('.tab-pane:hidden').each(function () {
                var tabId = $(this).attr("id");
                $('a[href="#' + tabId + '"]').click();
            });
            $('a[href="#' + tabId + '"]').click();
        }

        if ($().tabdrop) {
            $('.tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs').tabdrop({
                text: '<i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i>'
            });
        }
    };

    /**
     * 处理Bootstrap模块
     */
    var handleModals = function () {
        /**
         * 修复可堆叠模式问题：当2个或更多的模态打开时，关闭一个模态将删除.modal-open类
         */
        $('body').on('hide.bs.modal', function () {
            if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') === false) {
                $('html').addClass('modal-open');
            } else if ($('.modal:visible').size() <= 1) {
                $('html').removeClass('modal-open');
            }
        });

        /**
         * 修复页面滚动条问题
         */
        $('body').on('show.bs.modal', '.modal', function () {
            if ($(this).hasClass("modal-scroll")) {
                $('body').addClass("modal-open-noscroll");
            }
        });

        /**
         * 修复页面滚动条问题
         */
        $('body').on('hide.bs.modal', '.modal', function () {
            $('body').removeClass("modal-open-noscroll");
        });

        /**
         * 删除ajax内容并删除模式关闭的缓存
         */
        $('body').on('hidden.bs.modal', '.modal:not(.modal-cached)', function () {
            $(this).removeData('bs.modal');
        });
    };

    /**
     *处理Bootstrap工具提示
     */
    var handleTooltips = function () {
        // global tooltips
        $('.tooltips').tooltip();

        // portlet tooltips
        $('.portlet > .portlet-title .fullscreen').tooltip({
            container: 'body',
            title: 'Fullscreen'
        });
        $('.portlet > .portlet-title > .tools > .reload').tooltip({
            container: 'body',
            title: 'Reload'
        });
        $('.portlet > .portlet-title > .tools > .remove').tooltip({
            container: 'body',
            title: 'Remove'
        });
        $('.portlet > .portlet-title > .tools > .config').tooltip({
            container: 'body',
            title: 'Settings'
        });
        $('.portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip({
            container: 'body',
            title: 'Collapse/Expand'
        });
    };

    /**
     * 处理Bootstrap下拉菜单
     */
    var handleDropdowns = function () {
        /**
         * 点击时按住下拉菜单
         */
        $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
            e.stopPropagation();
        });
    };

    var handleAlerts = function () {
        $('body').on('click', '[data-close="alert"]', function (e) {
            $(this).parent('.alert').hide();
            $(this).closest('.note').hide();
            e.preventDefault();
        });

        $('body').on('click', '[data-close="note"]', function (e) {
            $(this).closest('.note').hide();
            e.preventDefault();
        });

        $('body').on('click', '[data-remove="note"]', function (e) {
            $(this).closest('.note').remove();
            e.preventDefault();
        });
    };

    /**
     * 处理Hower下拉菜单
     */
    var handleDropdownHover = function () {
        $('[data-hover="dropdown"]').not('.hover-initialized').each(function () {
            $(this).dropdownHover();
            $(this).addClass('hover-initialized');
        });
    };

    /**
     * 修复IE8和IE9的输入占位符问题
     */
    var handleFixInputPlaceholderForIE = function () {
        var isIe8 = !!navigator.userAgent.match(/MSIE 8.0/);
        var isIe9 = !!navigator.userAgent.match(/MSIE 9.0/);
        var isIe10 = !!navigator.userAgent.match(/MSIE 10.0/);
        //修复ie7＆ie8的html5占位符属性
        if (isIe8 || isIe9) { // ie8 & ie9
            // 这是HTML5的占位符修复输入，带有占位符 - 不修复类的输入将被跳过（例如：我们需要密码字段）
            $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
                var input = $(this);

                if (input.val() === '' && input.attr("placeholder") !== '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }

                input.focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                input.blur(function () {
                    if (input.val() === '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    };

    /**
     * 最后的popep popover
     */
    var lastPopedPopover;

    var handlePopovers = function () {
        $('.popovers').popover();

        /**
         * 关闭上次显示的弹出窗口
         */

        $(document).on('click.bs.popover.data-api', function (e) {
            if (lastPopedPopover) {
                lastPopedPopover.popover('hide');
            }
        });
    };
    /**
     * 使用jQuery SlimScroll插件处理可滚动内容
     */
    var handleScrollers = function () {
        App.initSlimScroll('.scroller');
    };

    var handleInitFullScreen = function () {
        var fullScreenClickCount = 0;
        $(".fullscreen").bind("click", function () {
            if (fullScreenClickCount % 2 === 0) {
                handleFullScreen();
            } else {
                exitFullscreen();
            }
            fullScreenClickCount++;
        });
    };
    return {
        init: function () {
            //IMPORTANT!!!:不要修改核心处理程序的调用顺序。
            //UI组件处理程序
            handleiCheck(); // 处理自定义iCheck收音机和复选框
            handleBootstrapSwitch(); // 处理自举开关插件
            handleScrollers(); // 处理苗条的滚动内容
            handleAlerts(); //处理可关闭的警报
            handleDropdowns(); // 处理下拉菜单
            handleTabs(); // 处理标签
            handleTooltips(); // 处理引导工具提示
            handlePopovers(); // 处理bootstrap弹出
            handleAccordions(); //处理手风琴
            handleModals(); // 处理模态
            handleBootstrapConfirmation(); // 处理引导确认
            handleFixInputPlaceholderForIE(); //IE8和IE9输入占位符问题修复
            handleInitFullScreen();//处理Init全屏

        },

        initSlimScroll: function (el) {
            $(el).each(function () {
                if ($(this).attr("data-initialized")) {
                    return; // exit
                }

                var height;

                if ($(this).attr("data-height")) {
                    height = $(this).attr("data-height");
                } else {
                    height = $(this).css('height');
                }

                $(this).slimScroll({
                    allowPageScroll: true,//当元素滚动结束时允许页面滚动
                    size: '7px',
                    color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
                    wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
                    position: isRTL ? 'left' : 'right',
                    height: height,
                    alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                    railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                    disableFadeOut: true
                });

                $(this).attr("data-initialized", "1");
            });
        },

        destroySlimScroll: function (el) {
            $(el).each(function () {
                if ($(this).attr("data-initialized") === "1") { // 在更新高度之前销毁现有的实例
                    $(this).removeAttr("data-initialized");
                    $(this).removeAttr("style");

                    var attrList = {};

                    /**
                     * 存储自定义属性，以便稍后我们将重新分配。
                     */
                    if ($(this).attr("data-handle-color")) {
                        attrList["data-handle-color"] = $(this).attr("data-handle-color");
                    }
                    if ($(this).attr("data-wrapper-class")) {
                        attrList["data-wrapper-class"] = $(this).attr("data-wrapper-class");
                    }
                    if ($(this).attr("data-rail-color")) {
                        attrList["data-rail-color"] = $(this).attr("data-rail-color");
                    }
                    if ($(this).attr("data-always-visible")) {
                        attrList["data-always-visible"] = $(this).attr("data-always-visible");
                    }
                    if ($(this).attr("data-rail-visible")) {
                        attrList["data-rail-visible"] = $(this).attr("data-rail-visible");
                    }

                    $(this).slimScroll({
                        wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                        destroy: true
                    });

                    var the = $(this);

                    // 重新分配自定义属性
                    $.each(attrList, function (key, value) {
                        the.attr(key, value);
                    });

                }
            });
        },
        /**
         * 获得Iframe布局高度
         * @returns {number}
         */
        getIframeLayoutHeight: function () {
            return handleIframeLayoutHeight();
        },
        /**
         * 处理sidebar ajax方式加载
         */
        requestFullScreen: function () {
            return handleFullScreen();
        },
        /**
         * 处理iframe内容
         */
        handleIframeContent: function () {
            return handleIframeLayoutContent();
        },
        /**
         * 处理sidebar ajax方式加载
         */
        handleSidebarAjaxContent: function () {
            jQuery('.sidebar-menu').on('click', ' li > a.ajaxify', function (e) {
                e.preventDefault();
                var url = $(this).attr("href");
                var pageContentBody = $('#tab-page-content');

                App.startPageLoading({message: '加载中...'});
                $.get(url, {}, function (res) {
                    pageContentBody.html(res);
                    App.stopPageLoading();
                });
            });
        },
        fixIframeContent: function () {
            setInterval(function () {
                handleIframeLayoutContent();
            }, 200);
            return;
        },
        blockUI: function (options) {

            options = $.extend(true, {}, options);
            var html = '';
            if (options.animate) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
            } else if (options.iconOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading/loading-spinner-blue.gif" align=""></div>';
            } else if (options.textOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            } else {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading/loading-spinner-blue.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            }

            if (options.target) { // element blocking
                var el = $(options.target);
                if (el.height() <= ($(window).height())) {
                    options.cenrerY = true;
                }
                el.block({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    centerY: options.cenrerY !== undefined ? options.cenrerY : false,
                    css: {
                        top: '10%',
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            } else { // 页面阻塞
                $.blockUI({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    css: {
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            }
        },

        /**
         * wrApper函数解除元素（完成加载）
         * @param target
         * @param title
         */
        unblockUI: function (target, title) {

            if (target) {
                $(target).unblock({
                    onUnblock: function () {
                        $(target).css('position', '');
                        $(target).css('zoom', '');
                    }
                });
            } else {
                $.unblockUI();
            }
        },

        startPageLoading: function (options) {
            if (options && options.animate) {
                $('.page-spinner-bar').remove();
                $('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
            } else {
                $('.page-loading').remove();
                $('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-blue.gif"/>&nbsp;&nbsp;<span>' + (options && options.message ? options.message : 'Loading...') + '</span></div>');
            }
        },

        stopPageLoading: function () {
            $('.page-loading, .page-spinner-bar').remove();
        },
        getViewPort: function () {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

        getbasePath: function () {
            return basePath;
        },

        setbasePath: function (path) {
            basePath = path;
        },

        setGlobalImgPath: function (path) {
            imgPath = path;
        },

        getGlobalImgPath: function () {
            return basePath + imgPath;
        },

        setGlobalPluginsPath: function (path) {
            pluginsPath = path;
        },

        getGlobalPluginsPath: function () {
            return basePath + pluginsPath;
        },

        getGlobalCssPath: function () {
            return basePath + cssPath;
        }
    };
}();

jQuery(document).ready(function () {
    App.init();
});
/**
 * 修复IE11 bug
 */
(function () {
    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

/**
 * 添加tabs
 * @param options
 */
var addTabs = function (options) {
    var url = window.location.pathname + "/../";
    //var url = window.location.protocol + '//' + window.location.host + "/";
    options.url = url + options.url;
    var id = "tab_" + options.id;
    var title = "", content = "";
    /**
     * 如果TAB不存在，创建一个新的TAB
     */
    if (!window.top.$("#" + id)[0]) {
        /**
         * 创建新TAB的title
         * @type {string}
         */
        title = '<a href="javascript:void(0);" id="tab_' + id + '"  data-id="' + id + '"  class="menu_tab" title=' + options.title + '>' + options.title;
        /**
         * 是否允许关闭
         */
        if (options.close) {
            title += ' <i class="fa fa-remove page_tab_close" style="cursor: pointer;" data-id="' + id + '" onclick="closeTab(this)"></i>';
        }
        title += '</a>';
        var loadIframe = "";
        /**
         * 是否指定TAB内容
         */
        if (options.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + options.content + '</div>';
        }
        /**
         *没有内容，使用iframe打开链接
         */
        else {
            App.blockUI({
                target: '#tab-content',
                boxed: true,
                message: '加载中......',
                animate: false
            });
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '" style="background: #F2F2F2;">';
            loadIframe = '<iframe onload="javascript:App.unblockUI(\'#tab-content\',\'' + options.title + '\');" src="' + options.url +
                '" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes"  allowtransparency="yes" id="iframe_' + id + '" class="  tab_iframe"></iframe>';
            content += loadIframe;
            content += '</div>';
        }
        /**
         * 加入tabs
         */
        window.top.$(".page-tabs-content").append(title);
        window.top.$("#tab-content").append(content);
    }
    window.top.$(".page-tabs-content > a.active").removeClass("active");
    window.top.$("#tab-content > .active").removeClass("active");

    /**
     * 激活tabs
     */
    window.top.$("#tab_" + id).addClass('active');
    scrollToTab(window.top.$('.menu_tab.active'));
    window.top.$("#" + id).addClass("active");

};
/**
 * 添加tab
 * @param options
 */
var addTab = function (options) {
    var id = "tab_" + options.id;
    var title = "", content = "";
    /**
     * 如果TAB不存在，创建一个新的TAB
     */
    if (!window.top.$("#" + id)[0]) {
        /**
         * 创建新TAB的title
         * @type {string}
         */
        title = '<a href="javascript:void(0);" id="tab_' + id + '"  data-id="' + id + '"  class="menu_tab" title=' + options.title + '>' + options.title;
        /**
         * 是否允许关闭
         */
        if (options.close) {
            title += ' <i class="fa fa-remove page_tab_close" style="cursor: pointer;" data-id="' + id + '" onclick="closeTab(this)"></i>';
        }
        title += '</a>';
        var loadIframe = "";
        /**
         * 是否指定TAB内容
         */
        if (options.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + options.content + '</div>';
        }
        /**
         *没有内容，使用iframe打开链接
         */
        else {
            App.blockUI({
                target: '#tab-content',
                boxed: true,
                message: '加载中......',
                animate: false
            });
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '" style="background: #F2F2F2;">';
            loadIframe = '<iframe onload="javascript:App.unblockUI(\'#tab-content\',\'' + options.title + '\');" src="' + options.url +
                '" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes"  allowtransparency="yes" id="iframe_' + id + '" class="  tab_iframe"></iframe>';
            content += loadIframe;
            content += '</div>';
        }
        /**
         * 加入tabs
         */
        window.top.$(".page-tabs-content").append(title);
        window.top.$("#tab-content").append(content);
    }
    window.top.$(".page-tabs-content > a.active").removeClass("active");
    window.top.$("#tab-content > .active").removeClass("active");

    /**
     * 激活tabs
     */
    window.top.$("#tab_" + id).addClass('active');
    scrollToTab(window.top.$('.menu_tab.active'));
    window.top.$("#" + id).addClass("active");

};
/**
 * 关闭tabs
 * @param item
 */
var closeTab = function (item) {
    var id = $(item).attr("data-id");
    /**
     * 如果关闭的是当前激活的TAB，激活他的前一个TAB
     */
    if ($(".page-tabs-content > a.active").attr('id') === "tab_" + id) {
        var prev = $("#tab_" + id).prev();
        var prevIframe = $("#" + id).prev();
        /**
         * 某种bug，需要延迟执行
         */
        setTimeout(function () {
            prev.addClass('active');
            prevIframe.addClass('active');
        }, 300);
    }

    /**
     * 关闭TAB
     */
    $("#tab_" + id).remove();
    $("#" + id).remove();

};
/**
 * 关闭当前标签
 */
var closeCurrentTab = function () {
    var currentTab = $('.page-tabs-content').find('.active').find('.fa-remove').parents('a');
    if (currentTab) {
        closeTab(currentTab);
    }
};
/**
 * 刷新标签
 */
var refreshTab = function () {
    var currentId = $('.page-tabs-content').find('.active').attr('data-id');
    var target = $('#iframe_' + currentId);
    var url = target.attr('src');

    target.attr('src', url);
};
var closeOtherTabs = function (isAll) {
    if (isAll) {
        $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').each(function () {
            $('#' + $(this).data('id')).remove();
            $(this).remove();
        });
        /**
         * 选中那些删不掉的第一个菜单
         * @type {jQuery}
         */
        var firstChild = $(".page-tabs-content").children();
        if (firstChild) {
            $('#' + firstChild.data('id')).addClass('active');
            firstChild.addClass('active');
        }
    }
    else {
        $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function () {
            $('#' + $(this).data('id')).remove();
            $(this).remove();
        });

    }
};
/**
 * 计算宽度
 * @param element
 * @returns {number}
 */
var calSumWidth = function (element) {
    var width = 0;
    $(element).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
};
/**
 * 滚动条滚动到右边
 * @returns {boolean}
 */
var scrollTabRight = function () {
    var marginLeftVal = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    var scrollVal = 0;
    if ($(".page-tabs-content").width() < visibleWidth) {
        return false;
    } else {
        var tabElement = $(".menu_tab:first");
        var offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        scrollVal = calSumWidth($(tabElement).prevAll());
        if (scrollVal > 0) {
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        }
    }
};
/**
 * 滚动条滚动
 * @param element
 */
var scrollToTab = function (element) {
    var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    var scrollVal = 0;
    if ($(".page-tabs-content").outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
};
/**
 * 滚动条滚动到左边
 * @returns {boolean}
 */
var scrollTabLeft = function () {
    var marginLeftVal = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    var scrollVal = 0;
    if ($(".page-tabs-content").width() < visibleWidth) {
        return false;
    } else {
        var tabElement = $(".menu_tab:first");
        var offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        offsetVal = 0;
        if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).prev();
            }
            scrollVal = calSumWidth($(tabElement).prevAll());
        }
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
};
/**
 * 激活Tab
 */
var activeTab = function () {
    var id = $(this).attr("data-id");
    $(".menu_tab").removeClass("active");
    $("#tab-content > .active").removeClass("active");
    //激活TAB
    $("#tab_" + id).addClass('active');
    $("#" + id).addClass("active");
    //主要是针对激活tab后，滚动条消失问题，触发一下滚动条事件
    $("#iframe_" + id).animate({
        height: App.getIframeLayoutHeight() + 1
    }, 500);
    $("#iframe_" + id).animate({
        height: App.getIframeLayoutHeight() - 1
    }, 500);
    scrollToTab(this);

};

$(function () {
    $(".menuTabs").on("click", ".menu_tab", activeTab);
});
/**
 * 禁用右键
 * @type {Function}
 */
//document.oncontextmenu = new Function("return false");
/**
 *
 * @type {document.onkeypress}
 */
//document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
//    var e = event || window.event || arguments.callee.caller.arguments[0];
//    //如果是F12
//    if (e && e.keyCode === 123) {
//        e.returnValue = false;
//        return (false);
//    }
//};

/**
 * AJAX 异常统一处理
 */
$(function () {
    $(document).ajaxError(
        //所有Ajax请求异常的统一处理函数，处理
        function (event, xhr, options, exc) {
            if (xhr.status === 'undefined') {
                return;
            }
            switch (xhr.status) {
                case 403:
                    // 未授权异常
                    $.modal.alert("您没有访问权限！", modal_status.FAIL);
                    break;
                case 404:
                    $.modal.alert("您访问的资源不存在！", modal_status.FAIL);
                    break;
                case 500:
                    $.modal.alert("服务器开小差了~~,请您稍后重试！", modal_status.FAIL);
                    break;
            }
        }
    );
});
/**
 * 左侧侧边栏
 */
$(function () {

    $.fn.sidebarMenu = function (options) {

        init($(this), options.data, 0);

        /**
         * 初始化
         * @param target
         * @param data
         * @param level
         */
        function init(target, data, level) {
            $.each(data, function (i, item) {
                //如果标签是isHeader
                var header = $('<li class="header"></li>');
                if (item.isHeader != null && item.isHeader === true) {
                    header.append(item.name);
                    target.append(header);
                    return;
                }
                //如果不是header
                var li = $('<li class="treeview" data-level="' + level + '"></li>');

                var a;
                if (level > 0) {
                    //一级二级三级菜单所具有的的位置
                    if (level == 1) {
                        a = $('<a style="padding-left:' + (level * 20) + 'px"></a>');
                    }
                    if (level == 2) {
                        a = $('<a style="padding-left:' + (level * 5) + 'px"></a>');
                    }
                    if (level == 3) {
                        a = $('<a style="padding-left:' + (level) + 'px"></a>');
                    }
                } else {
                    a = $('<a></a>');
                }
                var icon = $('<i></i>');
                //图标
                icon.addClass(item.icon);
                //是否打开
                var isOpen = item.isOpen;

                var text = $('<span class="title"></span>');
                //菜单名称
                text.addClass('menu-text').text(item.name);
                a.append(icon);
                a.append(text);
                a.addClass("nav-link");
                if (isOpen === true) {
                    li.addClass("active");
                }
                //如果有子菜单
                if (item.children && item.children.length > 0) {
                    var pullSpan = $('<span class="pull-right-container"></span>');
                    var pullIcon = $('<i class="fa fa-angle-left pull-right"></i>');
                    pullSpan.append(pullIcon);
                    a.append(pullSpan);
                    li.append(a);

                    var menus = $('<ul></ul>');
                    menus.addClass('treeview-menu');
                    if (isOpen === true) {
                        menus.css("display", "block");
                        menus.addClass("menu-open");
                    } else {
                        menus.css("display", "none");
                    }
                    //调用初始化方法
                    init(menus, item.children, level + 1);
                    li.append(menus);
                }
                else {
                    var href = 'addTabs({id:\'' + item.id + '\',title: \'' + item.name + '\',close: true,url: \'' + item.url + '\'});';
                    a.attr('onclick', href);
                    a.addClass("nav-link");
                    var badge = $("<span></span>");
                    if (item.tip != null && item.tip > 0) {
                        badge.addClass("label").addClass("label-success").text(item.tip);
                    }
                    a.append(badge);
                    li.append(a);
                }
                target.append(li);
            });
        }
    };
});

$(function ($) {
    $.extend({
        /**
         * 通用方法封装处理
         */
        common: {
            //解析参数
            parseParam: function (param, key) {
                var paramStr = "";
                if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                    paramStr += "&" + key + "=" + encodeURIComponent(param);
                } else {
                    $.each(param, function (i) {
                        var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                        paramStr += '&' + $.common.parseParam(this, k);
                    })
                }
                return paramStr.substr(1);
            },
            // 判断一个字符串是否为非空串
            isNotEmpty: function (value) {
                return !$.common.isEmpty(value);
            },
            // 判断字符串是否为空
            isEmpty: function (value) {
                return value == null || this.trim(value) === "";
            },
            // 是否显示数据 为空默认为显示
            visible: function (value) {
                return !!($.common.isEmpty(value) || value === true);
            },
            // 空格截取
            trim: function (value) {
                if (value == null) {
                    return "";
                }
                return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "");
            },
            // 指定随机数返回
            random: function (min, max) {
                return Math.floor((Math.random() * max) + min);
            }
        }
    });
});