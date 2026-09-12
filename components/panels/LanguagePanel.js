/* ============================================================
 * panels/LanguagePanel.js — 语言切换面板
 *   自注册到 window.PanelComponents，模板中使用 <language-panel>
 *
 *   用法：
 *     <language-panel
 *       v-model:locale="state.locale"
 *       :t="t"
 *       @toggle-sidebar="onToggleSidebar"
 *     />
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = global.PanelComponents || {};

  global.PanelComponents.LanguagePanel = {
    props: {
      locale: { type: String, default: 'zh-CN' },
      t: { type: Function, required: true },
    },
    emits: ['update:locale', 'toggle-sidebar'],
    template: `
      <panel-card :title="t('settings.language')">
        <div class="panel-row">
          <div class="panel-row-label">
            <span class="panel-row-title">locale:</span>
          </div>
          <x-badge variant="primary">{{ locale }}</x-badge>
        </div>
        <div style="margin-top: 12px">
          <x-button variant="primary" size="sm" @click="$emit('toggle-sidebar')">
            {{ t('common.toggleSidebar') }}
          </x-button>
        </div>
      </panel-card>
    `,
  };
})(window);
