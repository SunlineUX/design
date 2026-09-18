/* ============================================================
 * BarChartView.js — 柱状图展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.BarChartView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const data = [
        { label: '周一', value: 60 },
        { label: '周二', value: 90 },
        { label: '周三', value: 45 },
        { label: '周四', value: 78 },
        { label: '周五', value: 100 },
        { label: '周六', value: 30 },
        { label: '周日', value: 55 },
      ];
      const colorful = [
        { label: 'A', value: 80, color: '#1369e2' },
        { label: 'B', value: 60, color: '#059669' },
        { label: 'C', value: 40, color: '#f59e0b' },
        { label: 'D', value: 90, color: '#dc2626' },
      ];
      return { t, data, colorful };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.barChart') }}</h1>
        <p class="text-secondary">柱状图，用于对比各类别数据。</p>

        <panel-card title="基础柱状图">
          <x-bar-chart :data="data" :height="260" />
        </panel-card>

        <panel-card title="彩色柱状图">
          <x-bar-chart :data="colorful" :height="220" />
        </panel-card>
      </div>
    `,
  };
})(window);