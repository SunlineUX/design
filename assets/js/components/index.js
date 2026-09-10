/* ============================================================
 * components/index.js — 组件统一注册入口
 *
 *   依赖顺序（必须按此顺序在 HTML 中 <script> 引入）：
 *     1. Vue 3 CDN
 *     2. i18n.js
 *     3. settings.js
 *     4. base/BaseComponents.js
 *     5. layout/LayoutComponents.js
 *     6. panels/PanelComponents.js
 *     7. views/ViewComponents.js
 *     8. components/index.js  ← 本文件
 *
 *   注册完成后，HTML in-DOM 模板中可直接使用组件标签：
 *     <app-layout> <app-header> <app-sidebar> <home-view> ...
 * ============================================================ */
(function (global) {
  'use strict';

  function registerComponents(app) {
    /* 基础 UI 组件 */
    const B = global.BaseComponents || {};
    app.component('icon', B.Icon);
    app.component('base-button', B.BaseButton);
    app.component('segmented-control', B.SegmentedControl);
    app.component('badge', B.Badge);

    /* 布局组件 */
    const L = global.LayoutComponents || {};
    app.component('logo', L.Logo);
    app.component('breadcrumb', L.Breadcrumb);
    app.component('sidebar-toggle', L.SidebarToggle);
    app.component('sidebar-item', L.SidebarItem);
    app.component('app-sidebar', L.AppSidebar);
    app.component('app-header', L.AppHeader);
    app.component('app-layout', L.AppLayout);

    /* 业务面板组件 */
    const P = global.PanelComponents || {};
    app.component('panel-card', P.PanelCard);
    app.component('theme-switcher', P.ThemeSwitcher);
    app.component('language-panel', P.LanguagePanel);
    app.component('color-picker', P.ColorPicker);

    /* 页面视图组件 */
    const V = global.ViewComponents || {};
    app.component('home-view', V.HomeView);
    app.component('about-view', V.AboutView);
  }

  global.registerComponents = registerComponents;
})(window);
