/* ============================================================
 * FlexboxView.js — 弹性布局展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.FlexboxView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');

      const justify = ref('flex-start');
      const align = ref('center');
      const direction = ref('row');
      const justifyOptions = [
        { value: 'flex-start', label: 'flex-start' },
        { value: 'center', label: 'center' },
        { value: 'flex-end', label: 'flex-end' },
        { value: 'space-between', label: 'space-between' },
        { value: 'space-around', label: 'space-around' },
      ];
      const alignOptions = [
        { value: 'flex-start', label: 'flex-start' },
        { value: 'center', label: 'center' },
        { value: 'flex-end', label: 'flex-end' },
        { value: 'stretch', label: 'stretch' },
      ];
      const directionOptions = [
        { value: 'row', label: 'row' },
        { value: 'row-reverse', label: 'row-reverse' },
        { value: 'column', label: 'column' },
        { value: 'column-reverse', label: 'column-reverse' },
      ];

      return { t, justify, align, direction, justifyOptions, alignOptions, directionOptions };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.flexbox') }}</h1>
        <p class="text-secondary">弹性布局容器，支持方向、主轴对齐、交叉轴对齐等配置。</p>

        <panel-card title="交互演示 Interactive">
          <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:20px">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="width:80px;color:var(--text-tertiary);font-size:13px">方向</span>
              <x-segmented-control v-model="direction" :options="directionOptions" />
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <span style="width:80px;color:var(--text-tertiary);font-size:13px">主轴</span>
              <x-segmented-control v-model="justify" :options="justifyOptions" />
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <span style="width:80px;color:var(--text-tertiary);font-size:13px">交叉轴</span>
              <x-segmented-control v-model="align" :options="alignOptions" />
            </div>
          </div>
          <x-flexbox :direction="direction" :justify="justify" :align="align" :gap="12" style="min-height:200px;background:var(--bg-surface-2);border-radius:var(--radius-md);padding:12px">
            <x-picture-box title="1" height="60" />
            <x-picture-box title="2" bg="var(--color-success-soft)" height="80" />
            <x-picture-box title="3" bg="var(--color-warning)" style="color:#fff" height="50" />
          </x-flexbox>
        </panel-card>
      </div>
    `,
  };
})(window);
