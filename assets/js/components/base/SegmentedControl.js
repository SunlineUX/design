/* ============================================================
 * base/SegmentedControl.js — 分段选择器
 *   自注册到 window.BaseComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.BaseComponents = global.BaseComponents || {};

  global.BaseComponents.SegmentedControl = {
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
