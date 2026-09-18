/* ============================================================
 * base/XRadio.js — 单选框（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-radio>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XRadio = {
    props: {
      modelValue: { type: [String, Number, Boolean], default: null },
      value: { type: [String, Number, Boolean], required: true },
      name: { type: String, default: '' },
      disabled: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'change'],
    methods: {
      onChange() {
        this.$emit('update:modelValue', this.value);
        this.$emit('change', this.value);
      },
    },
    template: `
      <label class="x-radio" :class="{ 'x-radio--disabled': disabled }">
        <input
          class="x-radio__input"
          type="radio"
          :name="name || undefined"
          :value="value"
          :checked="modelValue === value"
          :disabled="disabled"
          @change="onChange"
        />
        <span class="x-radio__control" aria-hidden="true"></span>
        <span v-if="$slots.default" class="x-radio__label"><slot /></span>
      </label>
    `,
  };
})(window);
