/* ============================================================
 * layout/AppHeader.js — 顶栏
 *   Logo + SidebarControl + Breadcrumb + 右侧 actions slot
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.AppHeader = {
    props: {
      collapsed: { type: Boolean, default: false },
      t: { type: Function, required: true },
      brand: { type: Object, default: () => ({}) },
      menuItems: { type: Array, default: () => [] },
      showMenu: { type: Boolean, default: false },
      showSidebarControl: { type: Boolean, default: true },
      config: { type: Object, default: () => ({}) },
    },
    emits: ['toggle-sidebar'],
    setup(props) {
      const { computed, getCurrentInstance } = global.Vue;
      const instance = getCurrentInstance();
      const globalProperties = instance && instance.appContext.config.globalProperties;
      const router = globalProperties && globalProperties.$router;
      const route = globalProperties && globalProperties.$route;

      const label = item => props.t(item.label);
      const isActive = item => item.path && (
        route && (route.path === item.path || route.path.startsWith(item.path + '/'))
      );
      const hasChildren = item => item.children && item.children.length;
      const navigate = item => {
        if (item.path && router) router.push(item.path);
      };
      const bgMode = computed(() => {
        const configured = props.config?.mode || props.config?.header?.mode || 'inherit';

        return ['inherit', 'light', 'dark', 'theme-dark'].includes(configured)
          ? 'app-header_' + configured
          : 'app-header_inherit';
      });

      return { label, isActive, hasChildren, navigate, bgMode };
    },
    template: `
      <header class="app-header" :class="bgMode">
        <div class="app-header-left">
          <app-brand
            :brand="brand"
            :collapsed="collapsed"
            :show-sidebar-control="showSidebarControl"
            @toggle-sidebar="$emit('toggle-sidebar')"
            v-if="config?.showLogo"
          />
          <breadcrumb :t="t" />
        </div>
        <nav v-if="showMenu" class="app-header-menu" aria-label="主导航">
          <div
            v-for="item in menuItems"
            :key="item.key"
            class="app-header-menu-item"
            :class="{ active: isActive(item) }"
          >
            <button class="app-header-menu-link" type="button" @click="navigate(item)">
              <x-icon v-if="item.icon" :name="item.icon" :size="16" />
              <span>{{ label(item) }}</span>
              <x-icon v-if="hasChildren(item)" name="ArrowDown" :size="13" />
            </button>
            <div v-if="hasChildren(item)" class="app-header-submenu">
              <button
                v-for="child in item.children"
                :key="child.key"
                class="app-header-submenu-link"
                type="button"
                @click="navigate(child)"
              >
                <x-icon v-if="child.icon" :name="child.icon" :size="16" />
                <span>{{ label(child) }}</span>
              </button>
            </div>
          </div>
        </nav>
        <div class="app-header-right">
          <slot name="actions" />
        </div>
      </header>
    `,
  };
})(window);
