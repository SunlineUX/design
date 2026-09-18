/* ============================================================
 * base/XBarChart.js — 柱状图（纯 CSS/DIV，X 前缀基础组件）
 *   data: [{ label, value, color? }]
 *   自注册到 window.XComponents，模板中使用 <x-bar-chart>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XBarChart = {
    props: {
      data: { type: Array, default: () => [] },
      height: { type: Number, default: 220 },
      color: { type: String, default: '' },
      showValue: { type: Boolean, default: true },
    },
    setup(props) {
      const { computed } = global.Vue;
      const max = computed(() => Math.max(1, ...props.data.map(d => d.value)));
      const barColor = computed(() => props.color || 'var(--color-primary)');
      return { max, barColor };
    },
    template: `
      <div class="x-bar-chart" :style="{ height: height + 'px' }">
        <div v-for="(d, i) in data" :key="i" class="x-bar-chart__col">
          <span v-if="showValue" class="x-bar-chart__value">{{ d.value }}</span>
          <div class="x-bar-chart__bar-wrap">
            <div class="x-bar-chart__bar" :style="{ height: (d.value / max * 100) + '%', background: d.color || barColor }"></div>
          </div>
          <span class="x-bar-chart__label">{{ d.label }}</span>
        </div>
      </div>
    `,
  };
})(window);
