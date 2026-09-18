/* ============================================================
 * base/XCheckbox.js — 复选框（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-checkbox>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XCheckbox = {
    props: {
      modelValue: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'change'],
    methods: {
      onChange(event) {
        const checked = event.target.checked;
        this.$emit('update:modelValue', checked);
        this.$emit('change', checked);
      },
    },
    template: `
      <label class="x-checkbox" :class="{ 'x-checkbox--disabled': disabled }">
        <input
          class="x-checkbox__input"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          @change="onChange"
        />
        <span class="x-checkbox__control" aria-hidden="true"></span>
        <span v-if="$slots.default" class="x-checkbox__label"><slot /></span>
      </label>
    `,
  };
})(window);
