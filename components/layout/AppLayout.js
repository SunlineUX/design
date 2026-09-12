/* ============================================================
 * layout/AppLayout.js — 管理后台整体骨架
 *
 *   AppLayout
 *   ├── AppHeader（Logo / SidebarControl / Breadcrumb / actions slot）
 *   ├── AppSidebar（SidebarItem 递归菜单）
 *   └── router-view（页面出口 + fade 过渡）
 *
 *   未来新增布局（如 BlankLayout）参照本文件：
 *   新建 layout/XxxLayout.js 自注册到 window.LayoutComponents 即可，
 *   index.js 会自动遍历注册，无需改注册代码。
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.AppLayout = {
    props: {
      menuItems: { type: Array, required: true },
      collapsed: { type: Boolean, default: false },
      t: { type: Function, required: true },
      config: { type: Object, default: () => ({}) },
    },
    emits: ['update:collapsed'],
    setup(props, { emit }) {
      const toggle = () => emit('update:collapsed', !props.collapsed);
      return { toggle };
    },
    template: `
      <div class="app-layout">
        <app-header
          :collapsed="collapsed"
          :t="t"
          :brand="config.system"
          @toggle-sidebar="toggle"
        >
          <template #actions>
            <slot name="header-actions" />
          </template>
        </app-header>
        <div class="app-body">
          <app-sidebar
            :menu-items="menuItems"
            :collapsed="collapsed"
            :t="t"
          />
          <main class="app-main">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" :t="t" />
              </transition>
            </router-view>
          </main>
        </div>
      </div>
    `,
  };
})(window);
