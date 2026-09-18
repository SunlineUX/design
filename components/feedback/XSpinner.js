/* ============================================================
 * base/XSpinner.js — 旋转加载图标（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-spinner>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XSpinner = {
    props: {
      size: { type: [String, Number], default: 24 },
      color: { type: String, default: '' },
    },
    template: `
      <span class="x-spinner" :style="{ width: (typeof size === 'number' ? size : parseInt(size) || 24) + 'px', height: (typeof size === 'number' ? size : parseInt(size) || 24) + 'px', borderTopColor: color || 'var(--color-primary)' }"></span>
    `,
  };
})(window);
