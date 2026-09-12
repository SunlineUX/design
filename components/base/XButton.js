/* ============================================================
 * base/XButton.js — 按钮（X 前缀基础组件，在 .btn 基础上封装）
 *   自注册到 window.XComponents，模板中使用 <x-button>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XButton = {
    props: {
      variant: { type: String, default: 'default' }, // default | primary | ghost | link | warning
      size: { type: String, default: 'md' },          // sm | md | lg
      disabled: { type: Boolean, default: false },
    },
    template: `
      <button
        :class="[
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'ghost' && 'btn-ghost',
          variant === 'link' && 'btn-link',
          variant === 'warning' && 'btn-warning',
          size === 'sm' && 'btn-sm',
          size === 'md' && 'btn-md',
          size === 'lg' && 'btn-lg',
        ]"
        :disabled="disabled"
        @click="$emit('click', $event)"
      >
        <slot />
      </button>
    `,
  };
})(window);
