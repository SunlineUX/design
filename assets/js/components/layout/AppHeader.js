/* ============================================================
 * layout/AppHeader.js — 顶栏
 *   Logo + SidebarToggle + Breadcrumb + 右侧 actions slot
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.AppHeader = {
    props: {
      collapsed: { type: Boolean, default: false },
      t: { type: Function, required: true },
    },
    emits: ['toggle-sidebar'],
    template: `
      <header class="app-header">
        <div class="app-header-left">
          <logo />
          <sidebar-toggle :collapsed="collapsed" @toggle="$emit('toggle-sidebar')" />
          <breadcrumb :t="t" />
        </div>
        <div class="app-header-right">
          <slot name="actions" />
        </div>
      </header>
    `,
  };
})(window);
