/* ============================================================
 * layout/AppBrand.js — 应用品牌区
 *   Logo + 侧边栏折叠控制，自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.AppBrand = {
    props: {
      brand: { type: Object, default: () => ({}) },
      collapsed: { type: Boolean, default: false },
      showSidebarControl: { type: Boolean, default: true },
    },
    emits: ['toggle-sidebar'],
    template: `
      <div class="app-logo-system" :class="{ collapsed: collapsed }">
        <logo :logo="brand.logo" :name="brand.name" :collapsed="collapsed" />
        <sidebar-control
          v-if="showSidebarControl"
          :collapsed="collapsed"
          @toggle="$emit('toggle-sidebar')"
        />
      </div>
    `,
  };
})(window);
