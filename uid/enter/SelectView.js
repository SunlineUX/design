/* ============================================================
 * SelectView.js — 选择器展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SelectView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const value = ref('');
      const options = [
        { value: 'zh', label: '中文' },
        { value: 'en', label: 'English' },
        { value: 'ja', label: '日本語' },
        { value: 'ko', label: '한국어' },
      ];
      return { t, value, options };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.select') }}</h1>
        <p class="text-secondary">下拉选择器，支持单选、禁用选项。</p>

        <panel-card title="基础选择器">
          <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
            <div class="field">
              <label class="label">选择语言</label>
              <select class="select" v-model="value">
                <option value="" disabled>请选择</option>
                <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="field">
              <label class="label">禁用状态</label>
              <select class="select" disabled>
                <option>不可选择</option>
              </select>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);