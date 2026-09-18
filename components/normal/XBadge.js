/* ============================================================
 * base/XBadge.js — 标签 / 徽章（X 前缀基础组件，.chip 基础上封装）
 *   自注册到 window.XComponents，模板中使用 <x-badge>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XBadge = {
    props: {
      variant: { type: String, default: 'default' }, // default | primary | success
    },
    template: `
      <span :class="[
        'chip',
        variant === 'primary' && 'chip-primary',
        variant === 'success' && 'chip-success',
      ]"><slot /></span>
    `,
  };
})(window);
