/* ============================================================
 * views/ViewComponents.js — 页面视图层组件
 *   依赖：panels/PanelComponents.js + 全局 t() / settings
 *
 *   组件嵌套：
 *     HomeView
 *     ├── ThemeSwitcher
 *     └── LanguagePanel
 *     AboutView
 *     └── PanelCard
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = {

    /* ---------- HomeView ---------- */
    HomeView: {
      props: {
        settings: { type: Object, required: true },
        resolvedMode: { type: String, default: 'light' },
        t: { type: Function, required: true },
      },
      emits: ['toggle-sidebar'],
      template: `
        <div class="view-home">
          <h1 class="view-title">{{ t('nav.home') }}</h1>
          <div class="view-home-grid">
            <theme-switcher
              :model-value="settings.colorMode"
              :resolved-mode="resolvedMode"
              :t="t"
              @update:model-value="settings.colorMode = $event"
            />
            <language-panel
              :locale="settings.locale"
              :t="t"
              @update:locale="settings.locale = $event"
              @toggle-sidebar="$emit('toggle-sidebar')"
            />
          </div>
        </div>
      `,
    },

    /* ---------- AboutView ---------- */
    AboutView: {
      props: { t: { type: Function, required: true } },
      setup(props) {
        const features = [
          props.t('about.routing'),
          props.t('about.state'),
          props.t('about.components'),
          props.t('about.layout'),
          props.t('about.theme'),
          props.t('about.i18n'),
        ];
        return { features };
      },
      template: `
        <div class="view-about">
          <h1 class="view-title">{{ t('nav.about') }}</h1>
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 16px">NCBS</h3>
            <p class="muted" style="margin-bottom: 16px">
              NCBS · Vue 3 + Composition API + CSS Variables
            </p>
            <ul class="about-list">
              <li v-for="(f, i) in features" :key="i">{{ f }}</li>
            </ul>
          </div>
        </div>
      `,
    },

    /* ---------- SystemUsersView ---------- */
    SystemUsersView: {
      props: { t: { type: Function, required: true } },
      template: `
        <div class="view-system">
          <h1 class="view-title">{{ t('nav.systemUsers') }}</h1>
          <div class="card">
            <h3 class="card-title">用户列表</h3>
            <p class="muted">此处为用户管理页面，可集成表格、搜索、分页等功能。</p>
          </div>
        </div>
      `,
    },

    /* ---------- SystemRolesView ---------- */
    SystemRolesView: {
      props: { t: { type: Function, required: true } },
      template: `
        <div class="view-system">
          <h1 class="view-title">{{ t('nav.systemRoles') }}</h1>
          <div class="card">
            <h3 class="card-title">角色列表</h3>
            <p class="muted">此处为角色管理页面，可集成权限分配、角色编辑等功能。</p>
          </div>
        </div>
      `,
    },
  };
})(window);
