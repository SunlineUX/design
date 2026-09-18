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
      const multiValue = ref(['zh', 'en']);
      const options = [
        { value: 'zh', label: '中文' },
        { value: 'en', label: 'English' },
        { value: 'ja', label: '日本語' },
        { value: 'ko', label: '한국어' },
        { value: 'fr', label: 'Français' },
      ];
      const disabledOptions = [
        { value: 'a', label: '可选 A' },
        { value: 'b', label: '禁用 B', disabled: true },
        { value: 'c', label: '可选 C' },
      ];
      const cSingle = `<x-select v-model="value" :options="options"
  placeholder="请选择" />`;
      const cMulti = `<x-select v-model="multiValue" :options="options"
  multiple placeholder="请选择" />`;
      const cClearable = `<x-select v-model="value" :options="options"
  clearable placeholder="请选择" />`;
      return { t, value, multiValue, options, disabledOptions, cSingle, cMulti, cClearable };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.select') }}</h1>
        <p class="text-secondary">下拉选择器，支持单选、多选、可清空、禁用选项。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="单选 Single" :code="cSingle">
            <div class="field">
              <label class="label">选择语言</label>
              <x-select v-model="value" :options="options" placeholder="请选择语言" />
            </div>
          </x-demo-block>

          <x-demo-block title="多选 Multiple" :code="cMulti">
            <div class="field">
              <label class="label">多选语言</label>
              <x-select v-model="multiValue" :options="options" multiple placeholder="请选择（可多选）" />
              <div style="margin-top:8px;color:var(--text-tertiary);font-size:13px">已选：{{ multiValue.join(', ') || '无' }}</div>
            </div>
          </x-demo-block>

          <x-demo-block title="可清空 Clearable" :code="cClearable">
            <div class="field">
              <label class="label">可清空选择</label>
              <x-select v-model="value" :options="options" clearable placeholder="请选择" />
            </div>
          </x-demo-block>

          <x-demo-block title="禁用选项 Disabled" :code="cSingle">
            <div class="field">
              <label class="label">含禁用选项</label>
              <x-select :model-value="''" :options="disabledOptions" placeholder="请选择" />
            </div>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);