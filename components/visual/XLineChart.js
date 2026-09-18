/* ============================================================
 * base/XLineChart.js — 折线图（纯 SVG，X 前缀基础组件）
 *   data: [{ label, value }]
 *   自注册到 window.XComponents，模板中使用 <x-line-chart>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XLineChart = {
    props: {
      data: { type: Array, default: () => [] },
      width: { type: Number, default: 500 },
      height: { type: Number, default: 260 },
      color: { type: String, default: '' },
      smooth: { type: Boolean, default: true },
    },
    setup(props) {
      const { computed } = global.Vue;
      const pad = { l: 40, r: 20, t: 20, b: 30 };
      const innerW = computed(() => props.width - pad.l - pad.r);
      const innerH = computed(() => props.height - pad.t - pad.b);
      const max = computed(() => Math.max(1, ...props.data.map(d => d.value)));
      const points = computed(() => props.data.map((d, i) => {
        const x = pad.l + (props.data.length <= 1 ? innerW.value / 2 : (i / (props.data.length - 1)) * innerW.value);
        const y = pad.t + innerH.value - (d.value / max.value) * innerH.value;
        return { x, y, ...d };
      }));
      const pathD = computed(() => {
        if (!points.value.length) return '';
        const p = points.value;
        let d = 'M ' + p[0].x + ' ' + p[0].y;
        if (props.smooth && p.length > 1) {
          for (let i = 1; i < p.length; i++) {
            const prev = p[i - 1], cur = p[i];
            const cpx = (prev.x + cur.x) / 2;
            d += ' C ' + cpx + ' ' + prev.y + ', ' + cpx + ' ' + cur.y + ', ' + cur.x + ' ' + cur.y;
          }
        } else {
          for (let i = 1; i < p.length; i++) d += ' L ' + p[i].x + ' ' + p[i].y;
        }
        return d;
      });
      const areaD = computed(() => {
        if (!points.value.length) return '';
        const p = points.value;
        return pathD.value + ' L ' + p[p.length - 1].x + ' ' + (pad.t + innerH.value) + ' L ' + p[0].x + ' ' + (pad.t + innerH.value) + ' Z';
      });
      const stroke = computed(() => props.color || 'var(--color-primary)');
      return { pad, points, pathD, areaD, stroke };
    },
    template: `
      <div class="x-line-chart">
        <svg :width="width" :height="height">
          <defs>
            <linearGradient :id="'grad-' + color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="stroke" stop-opacity="0.3" />
              <stop offset="100%" :stop-color="stroke" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="areaD" :fill="'url(#grad-' + color + ')'" />
          <path :d="pathD" fill="none" :stroke="stroke" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle v-for="(p, i) in points" :key="i" :cx="p.x" :cy="p.y" r="4" fill="#fff" :stroke="stroke" stroke-width="2" />
          <text v-for="(p, i) in points" :key="'l' + i" :x="p.x" :y="height - 10" text-anchor="middle" font-size="11" fill="var(--text-tertiary)">{{ p.label }}</text>
        </svg>
      </div>
    `,
  };
})(window);
