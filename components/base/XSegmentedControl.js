/* ============================================================
 * base/XSegmentedControl.js — 分段选择器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-segmented-control>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XSegmentedControl = {
    props: {
      modelValue: { type: [String, Number], required: true },
      options: { type: Array, required: true }, // [{value, label}]
    },
    emits: ['update:modelValue'],
    template: `
      <div class="segmented">
        <button
          v-for="opt in options"
          :key="opt.value"
          :class="{ active: modelValue === opt.value }"
          @click="$emit('update:modelValue', opt.value)"
        >{{ opt.label }}</button>
      </div>
    `,
  };
})(window);
