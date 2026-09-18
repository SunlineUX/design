/* ============================================================
 * components/index.js — 共享组件统一入口（清单 + 加载器 + 注册器）
 *
 *   HTML 中只需引入本文件：
 *     <script src="../components/index.js"></script>
 *
 *   它做三件事：
 *     1. MANIFEST 声明共享组件文件清单（新增组件在这里加一行）
 *     2. 按依赖顺序同步加载（document.write，仅在 HTML 解析期可用）
 *     3. 提供 registerComponents(app) 供应用启动时自动注册全部组件
 *
 *   约定：基础组件统一 X 前缀（XIcon/XButton/XDropdown…），
 *         自注册到 window.XComponents，模板标签为 <x-xxx>。
 *
 *   注意：views（页面视图）不在此处加载 —— 各项目入口（如
 *   datamind/index.html）用自己的 views.js 配置文件加载本项目的页面。
 *
 *   依赖顺序（MANIFEST 内的分组顺序）：
 *     Vue → Vue Router → i18n → settings → routes →
 *     normal → enter → feedback → display → visual →
 *     layout → panels → 本文件 → 各项目 views.js → 应用启动
 * ============================================================ */
(function (global) {
  'use strict';

  /* ---------- 资源路径（基于本文件位置推导，与页面位置无关） ---------- */
  const HERE = new URL('./', document.currentScript.src).href;  // .../components/

  /* ---------- 缓存版本号：修改组件后刷新页面不生效时，把版本号 +1 ---------- */
  const VER = '16';

  /* ---------- 共享组件清单：新增组件在这里加一行 ---------- */
  const MANIFEST = {
    base: [
      'base/Tabbar.js',
      'base/ToolBar.js',
    ],
    normal: [
      'normal/XIcon.js',
      'normal/XButton.js',
      'normal/XBadge.js',
      'normal/XDivider.js',
      'normal/XSpace.js',
    ],
    enter: [
      'enter/XCheckbox.js',
      'enter/XRadio.js',
      'enter/XDropdown.js',
      'enter/XSelect.js',
      'enter/XSwitch.js',
    ],
    feedback: [
      'feedback/XPopupPosition.js',
      'feedback/XPopover.js',
      'feedback/XTooltip.js',
      'feedback/XModal.js',
      'feedback/XMessage.js',
      'feedback/XNotification.js',
      'feedback/XProgress.js',
      'feedback/XSpinner.js',
      'feedback/XLoading.js',
      'feedback/XAlert.js',
    ],
    display: [
      'display/XSegmentedControl.js',
      'display/XPictureBox.js',
      'display/XCard.js',
      'display/XDemoBlock.js',
      'display/XTable.js',
      'display/XCarousel.js',
    ],
    visual: [
      'visual/XLineChart.js',
      'visual/XBarChart.js',
      'visual/XPieChart.js',
    ],
    layout: [
      'layout/Logo.js',
      'layout/AppBrand.js',
      'layout/Breadcrumb.js',
      'layout/SidebarControl.js',
      'layout/SidebarItem.js',
      'layout/AppSidebar.js',
      'layout/AppHeader.js',
      'layout/AppLayout.js',
      'layout/XFlexbox.js',
      'layout/XSpliter.js',
      'layout/XWaterfall.js',
    ],
    panels: [
      'panels/PanelCard.js',
      'panels/ColorPicker.js',
      'panels/ThemeSwitcher.js',
      'panels/LanguagePanel.js',
      'panels/AppSetting.js',
      'panels/UserSetting.js',
    ],
  };

  /* ---------- 合并所有组件为单个 script 标签写入（减少 HTTP 请求） ---------- */
  (function load() {
    const groups = ['base', 'normal', 'enter', 'feedback', 'display', 'visual', 'layout', 'panels'];
    const files = [];
    groups.forEach(g => { if (MANIFEST[g]) MANIFEST[g].forEach(f => files.push(HERE + f)); });

    let combined = '';
    files.forEach(src => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src + '?v=' + VER, false); // 同步读取，保证执行顺序
      try { xhr.send(); } catch (e) { return; }
      if (xhr.status === 200 || xhr.status === 0) {
        combined += '\n/* ===== ' + src + ' ===== */\n' + xhr.responseText + '\n';
      }
    });
    // 转义内容中的 </script>，避免提前闭合当前标签
    combined = combined.replace(/<\/script>/gi, '<\\/script>');
    document.write('<script>' + combined + '<\/script>');
  })();

  /* ---------- PascalCase → kebab-case：XButton → x-button / SidebarItem → sidebar-item ---------- */
  function toKebab(name) {
    // \B([A-Z]) 匹配「非单词边界处的大写字母」：
    // 正确处理 X 前缀与连续大写，如 XIcon → X-Icon → x-icon（与 Vue 内置 hyphenate 一致）
    return name.replace(/\B([A-Z])/g, '-$1').toLowerCase();
  }

  /* ---------- 自动遍历注册全部组件 ---------- */
  function registerAll(app, namespace) {
    const components = global[namespace] || {};
    Object.keys(components).forEach(key => {
      app.component(toKebab(key), components[key]);
    });
  }

  function registerComponents(app) {
    registerAll(app, 'XComponents');        /* <x-icon> <x-button> <x-dropdown> ... */
    registerAll(app, 'LayoutComponents');   /* <app-layout> <sidebar-item> ... */
    registerAll(app, 'PanelComponents');    /* <panel-card> <theme-switcher> ... */
    registerAll(app, 'ViewComponents');     /* <home-view> <about-view> ... */
  }

  global.registerComponents = registerComponents;
})(window);
