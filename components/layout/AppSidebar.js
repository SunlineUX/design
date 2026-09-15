/* ============================================================
 * layout/AppSidebar.js — 侧边栏
 *   遍历 menuItems 渲染 SidebarItem（递归）
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.AppSidebar = {
    props: {
      menuItems: { type: Array, required: true },
      collapsed: { type: Boolean, default: false },
      t: { type: Function, required: true },
      brand: { type: Object, default: () => ({}) },
      showSidebarControl: { type: Boolean, default: true },
    },
    emits: ['toggle-sidebar'],
    template: `
      <aside class="app-sidebar" :class="{ collapsed: collapsed }">
        <app-brand
          :brand="brand"
          :collapsed="collapsed"
          :show-sidebar-control="showSidebarControl"
          @toggle-sidebar="$emit('toggle-sidebar')"
        />
        <div class="sidebar-menu">
          <sidebar-item
            v-for="item in menuItems"
            :key="item.key"
            :item="item"
            :t="t"
            :collapsed="collapsed"
          />
        </div>
      </aside>
    `,
  };
})(window);
