/* ============================================================
 * base/XProgress.js — 进度条 / 进度圈（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-progress>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XProgress = {
    props: {
      percent: { type: Number, default: 0 }, // 0-100
      type: { type: String, default: 'line' }, // line | circle
      size: { type: Number, default: 120 }, // circle 直径
      strokeWidth: { type: Number, default: 8 },
      color: { type: String, default: '' },
      showInfo: { type: Boolean, default: true },
    },
    setup(props) {
      const { computed } = global.Vue;
      const pct = computed(() => Math.min(100, Math.max(0, props.percent)));
      const circumference = computed(() => {
        const r = (props.size - props.strokeWidth) / 2;
        return 2 * Math.PI * r;
      });
      const dashoffset = computed(() => circumference.value * (1 - pct.value / 100));
      const barColor = computed(() => props.color || 'var(--color-primary)');
      return { pct, circumference, dashoffset, barColor };
    },
    template: `
      <div v-if="type === 'line'" class="x-progress x-progress--line">
        <div class="x-progress__bar">
          <div class="x-progress__bar-inner" :style="{ width: pct + '%', background: barColor }"></div>
        </div>
        <span v-if="showInfo" class="x-progress__info">{{ pct }}%</span>
      </div>
      <div v-else class="x-progress x-progress--circle" :style="{ width: size + 'px', height: size + 'px' }">
        <svg :width="size" :height="size">
          <circle :cx="size / 2" :cy="size / 2" :r="(size - strokeWidth) / 2" fill="none" :stroke="'var(--bg-surface-3)'" :stroke-width="strokeWidth" />
          <circle :cx="size / 2" :cy="size / 2" :r="(size - strokeWidth) / 2" fill="none" :stroke="barColor" :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="dashoffset" stroke-linecap="round" :transform="'rotate(-90 ' + (size / 2) + ' ' + (size / 2) + ')'" :style="{ transition: 'stroke-dashoffset .4s ease' }" />
        </svg>
        <span v-if="showInfo" class="x-progress__circle-info">{{ pct }}%</span>
      </div>
    `,
  };
})(window);
