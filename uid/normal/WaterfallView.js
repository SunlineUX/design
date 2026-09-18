/* ============================================================
 * WaterfallView.js — 瀑布流展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.WaterfallView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const columns = ref(3);
      const columnOptions = [
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
      ];
      const items = [
        { h: 100, bg: 'var(--color-primary-soft)' },
        { h: 160, bg: 'var(--color-success-soft)' },
        { h: 120, bg: 'var(--color-warning)' },
        { h: 180, bg: 'var(--color-danger)' },
        { h: 90, bg: 'var(--color-info)' },
        { h: 140, bg: 'var(--color-primary-soft)' },
        { h: 110, bg: 'var(--color-success-soft)' },
        { h: 170, bg: 'var(--color-warning)' },
        { h: 100, bg: 'var(--color-primary-soft)' },
        { h: 150, bg: 'var(--color-success-soft)' },
        { h: 130, bg: 'var(--color-info)' },
        { h: 95, bg: 'var(--color-warning)' },
      ];
      return { t, columns, columnOptions, items };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.waterfall') }}</h1>
        <p class="text-secondary">瀑布流布局，基于 CSS Columns，自动按高度填充。</p>

        <panel-card title="瀑布流演示">
          <div style="margin-bottom:16px">
            <span style="color:var(--text-tertiary);font-size:13px;margin-right:12px">列数：</span>
            <x-segmented-control v-model="columns" :options="columnOptions" />
          </div>
          <x-waterfall :columns="columns" :gap="12">
            <div v-for="(item, i) in items" :key="i"
              :style="{ background: item.bg, height: item.h + 'px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }">
              {{ i + 1 }}
            </div>
          </x-waterfall>
        </panel-card>
      </div>
    `,
  };
})(window);
