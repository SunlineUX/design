/* ============================================================
 * layout/SidebarControl.js — 侧边栏折叠/展开按钮
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.SidebarControl = {
    props: { collapsed: { type: Boolean, default: false } },
    emits: ['toggle'],
    template: `
      <button class="sidebar-control" @click="$emit('toggle')" :title="collapsed ? '展开侧边栏' : '折叠侧边栏'">
        <x-icon :name="collapsed ? 'SidebarLeftCollapse' : 'SidebarLeftExpand'" :size="18" />
      </button>
    `,
  };
})(window);
