/* ============================================================
 * LineChartView.js — 折线图展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.LineChartView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const smooth = ref(true);
      const data = ref([
        { label: '1月', value: 120 },
        { label: '2月', value: 200 },
        { label: '3月', value: 150 },
        { label: '4月', value: 280 },
        { label: '5月', value: 220 },
        { label: '6月', value: 350 },
        { label: '7月', value: 300 },
      ]);
      return { t, smooth, data };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.lineChart') }}</h1>
        <p class="text-secondary">折线图，展示数据随时间的变化趋势。</p>

        <panel-card title="平滑折线">
          <x-line-chart :data="data" :smooth="smooth" :width="560" :height="280" />
        </panel-card>

        <panel-card title="折线">
          <x-line-chart :data="data" :smooth="false" :width="560" :height="280" color="var(--color-success)" />
        </panel-card>
      </div>
    `,
  };
})(window);