/* ============================================================
 * PieChartView.js — 饼图展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.PieChartView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const data = [
        { label: '直接访问', value: 35 },
        { label: '搜索引擎', value: 28 },
        { label: '社交媒体', value: 20 },
        { label: '邮件营销', value: 12 },
        { label: '其他', value: 5 },
      ];
      return { t, data };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.pieChart') }}</h1>
        <p class="text-secondary">饼图，展示各部分占整体的比例。</p>

        <panel-card title="饼图">
          <x-pie-chart :data="data" :size="240" />
        </panel-card>

        <panel-card title="环形图">
          <x-pie-chart :data="data" :size="240" :inner-radius="70" />
        </panel-card>
      </div>
    `,
  };
})(window);