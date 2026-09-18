/* ============================================================
 * base/XPieChart.js — 饼图（纯 SVG，X 前缀基础组件）
 *   data: [{ label, value, color? }]
 *   自注册到 window.XComponents，模板中使用 <x-pie-chart>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  const DEFAULT_COLORS = ['#1369e2', '#059669', '#f59e0b', '#dc2626', '#0ea5e9', '#8b5cf6', '#ec4899'];

  global.XComponents.XPieChart = {
    props: {
      data: { type: Array, default: () => [] },
      size: { type: Number, default: 220 },
      innerRadius: { type: Number, default: 0 }, // >0 为环形图
    },
    setup(props) {
      const { computed } = global.Vue;
      const total = computed(() => props.data.reduce((s, d) => s + d.value, 0) || 1);
      const slices = computed(() => {
        let acc = 0;
        const r = props.size / 2;
        const cx = r, cy = r;
        const inner = props.innerRadius;
        return props.data.map((d, i) => {
          const startAngle = (acc / total.value) * Math.PI * 2 - Math.PI / 2;
          acc += d.value;
          const endAngle = (acc / total.value) * Math.PI * 2 - Math.PI / 2;
          const large = endAngle - startAngle > Math.PI ? 1 : 0;
          const x1 = cx + r * Math.cos(startAngle);
          const y1 = cy + r * Math.sin(startAngle);
          const x2 = cx + r * Math.cos(endAngle);
          const y2 = cy + r * Math.sin(endAngle);
          let path;
          if (inner > 0) {
            const ix1 = cx + inner * Math.cos(endAngle);
            const iy1 = cy + inner * Math.sin(endAngle);
            const ix2 = cx + inner * Math.cos(startAngle);
            const iy2 = cy + inner * Math.sin(startAngle);
            path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${inner} ${inner} 0 ${large} 0 ${ix2} ${iy2} Z`;
          } else {
            path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          }
          return { ...d, path, color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length], percent: ((d.value / total.value) * 100).toFixed(1) };
        });
      });
      return { slices };
    },
    template: `
      <div class="x-pie-chart">
        <svg :width="size" :height="size" :viewBox="'0 0 ' + size + ' ' + size">
          <path v-for="(s, i) in slices" :key="i" :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2" />
        </svg>
        <div class="x-pie-chart__legend">
          <div v-for="(s, i) in slices" :key="i" class="x-pie-chart__legend-item">
            <span class="x-pie-chart__legend-dot" :style="{ background: s.color }"></span>
            <span class="x-pie-chart__legend-label">{{ s.label }}</span>
            <span class="x-pie-chart__legend-value">{{ s.value }} ({{ s.percent }}%)</span>
          </div>
        </div>
      </div>
    `,
  };
})(window);
