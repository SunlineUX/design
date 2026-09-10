/* ============================================================
 * views/HomeView.js — 首页
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.HomeView = {
    setup() {
      const { inject } = global.Vue;
      const settings = inject('settings');
      const t = inject('t');
      const resolvedMode = settings.resolvedMode;
      return { settings, t, resolvedMode };
    },
    template: `
      <div class="view-home">
        <h1 class="view-title">{{ t('nav.home') }}</h1>
        <div class="view-home-grid">
          <theme-switcher
            :model-value="settings.state.colorMode"
            :resolved-mode="resolvedMode.value"
            :t="t"
            @update:model-value="settings.state.colorMode = $event"
          />
          <language-panel
            :locale="settings.state.locale"
            :t="t"
            @update:locale="settings.state.locale = $event"
          />
        </div>
      </div>
    `,
  };
})(window);
