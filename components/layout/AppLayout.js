/* ============================================================
 * layout/AppLayout.js — 管理后台整体骨架
 *
 *   AppLayout
 *   ├── sideLayout：AppSidebar + AppHeader（无菜单）+ router-view
 *   ├── topLayout：AppHeader（完整菜单）+ router-view
 *   └── mixLayout：AppHeader（一级菜单）+ AppSidebar（子菜单）+ router-view
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
      const { computed } = global.Vue;
      const toggle = () => emit('update:collapsed', !props.collapsed);
      const layoutType = computed(() => {
        const configured = props.config.layout?.layout;
        return ['sideLayout', 'topLayout', 'mixLayout'].includes(configured)
          ? configured
          : 'sideLayout';
      });
      const isSideLayout = computed(() => layoutType.value === 'sideLayout');
      const isTopLayout = computed(() => layoutType.value === 'topLayout');
      const isMixLayout = computed(() => layoutType.value === 'mixLayout');
      const headerMenuItems = computed(() => isTopLayout.value
        ? props.menuItems
        : isMixLayout.value ? props.menuItems : []);
      const sidebarMenuItems = computed(() => isMixLayout.value
        ? props.menuItems.reduce((items, item) => items.concat(item.children || []), [])
        : props.menuItems);

      return {
        toggle,
        layoutType,
        isSideLayout,
        isTopLayout,
        isMixLayout,
        headerMenuItems,
        sidebarMenuItems,
      };
    },
    template: `
      <div class="app-layout" :class="'app-layout--' + layoutType">
        <div v-if="isSideLayout" class="app-side-shell">
          <app-sidebar
            :menu-items="sidebarMenuItems"
            :collapsed="collapsed"
            :sidebar-config="config.layout.sidebar"
            :brand="config.system"
            :t="t"
            :show-sidebar-control="true"
            @toggle-sidebar="toggle"
          />
          <div class="app-side-main">
            <app-header
              :brand="config.system"
              :collapsed="collapsed"
              :t="t"
              :menu-items="headerMenuItems"
              :show-menu="false"
              :show-sidebar-control="true"
              :header-config="config.layout.header"
              @toggle-sidebar="toggle"
            >
              <template #actions>
                <slot name="header-actions" />
              </template>
            </app-header>
            <main class="app-main">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" :t="t" />
                </transition>
              </router-view>
            </main>
          </div>
        </div>
        <template v-else>
          <app-header
            :collapsed="collapsed"
            :t="t"
            :brand="config.system"
            :menu-items="headerMenuItems"
            :show-menu="isTopLayout || isMixLayout"
            :show-sidebar-control="isMixLayout"
            :header-config="config.layout.header"
            @toggle-sidebar="toggle"
          >
            <template #actions>
              <slot name="header-actions" />
            </template>
          </app-header>
          <div class="app-body" :class="{ 'app-body--top': isTopLayout }">
            <app-sidebar
              v-if="isMixLayout"
              :menu-items="sidebarMenuItems"
              :collapsed="collapsed"
              :brand="config.system"
              :t="t"
              :show-sidebar-control="false"
              @toggle-sidebar="toggle"
            />
            <main class="app-main">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" :t="t" />
                </transition>
              </router-view>
            </main>
          </div>
        </template>
      </div>
    `,
  };
})(window);
