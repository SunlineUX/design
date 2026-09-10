/* ============================================================
 * base/BaseButton.js — 按钮（在 .btn 基础上封装）
 *   自注册到 window.BaseComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.BaseComponents = global.BaseComponents || {};

  global.BaseComponents.BaseButton = {
    props: {
      variant: { type: String, default: 'default' }, // default | primary | ghost
      size: { type: String, default: 'md' },         // sm | md
      disabled: { type: Boolean, default: false },
    },
    template: `
      <button
        :class="[
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'ghost' && 'btn-ghost',
          size === 'sm' && 'btn-sm'
        ]"
        :disabled="disabled"
        @click="$emit('click', $event)"
      >
        <slot />
      </button>
    `,
  };
})(window);
