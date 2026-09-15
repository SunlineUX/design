/* ============================================================
 * views/AppSettingView.js — 应用设置页
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 *   组合 <app-setting> 与 <user-setting> 两个面板组件
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.AppSettingsView = {
    setup() {
      const { inject, ref } = global.Vue;
      const settings = inject('settings');
      const t = inject('t');
      /* sub-tab：app / user */
      const activeTab = ref('app');
      const switchTab = (name) => { activeTab.value = name; };
      return { settings, t, activeTab, switchTab };
    },
    template: `
      <div class="view-appsettings">
        <h1 class="view-title">{{ t('nav.appSettings') }}</h1>

        <!-- 子标签切换 -->
        <!-- <div class="segmented" style="margin-bottom: var(--space-lg)">
          <button :class="{ active: activeTab === 'app' }" @click="switchTab('app')">
            {{ t('settings.title') }}
          </button>
          <button :class="{ active: activeTab === 'user' }" @click="switchTab('user')">
            {{ t('user.title') }}
          </button>
        </div>

        <app-setting v-if="activeTab === 'app'" :t="t" />
        <user-setting v-else :t="t" /> -->

        <app-setting :t="t" />
      </div>
    `,
  };
})(window);
