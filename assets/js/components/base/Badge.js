/* ============================================================
 * base/Badge.js — 标签 / 徽章（.chip 基础上封装）
 *   自注册到 window.BaseComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.BaseComponents = global.BaseComponents || {};

  global.BaseComponents.Badge = {
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
