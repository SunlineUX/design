/* ============================================================
 * base/XSwitch.js — 开关（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-switch>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XSwitch = {
    props: {
      modelValue: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      size: { type: String, default: 'md' }, // sm | md | lg
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const toggle = () => {
        if (props.disabled) return;
        emit('update:modelValue', !props.modelValue);
        emit('change', !props.modelValue);
      };
      return { toggle };
    },
    template: `
      <button
        type="button"
        class="x-switch"
        :class="['x-switch--' + size, { 'x-switch--on': modelValue, 'x-switch--disabled': disabled }]"
        role="switch"
        :aria-checked="modelValue"
        @click="toggle"
      >
        <span class="x-switch__handle"></span>
      </button>
    `,
  };
})(window);
