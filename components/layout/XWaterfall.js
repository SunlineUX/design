/* ============================================================
 * base/XWaterfall.js — 瀑布流布局（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-waterfall>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XWaterfall = {
    props: {
      columns: { type: Number, default: 3 },
      gap: { type: [String, Number], default: 12 },
    },
    template: `
      <div
        class="x-waterfall"
        :style="{ columnCount: columns, columnGap: (typeof gap === 'number' ? gap : parseInt(gap) || 12) + 'px' }"
      >
        <div class="x-waterfall__item" v-for="(child, i) in $slots.default ? [] : []" :key="i"></div>
        <slot />
      </div>
    `,
  };
})(window);
