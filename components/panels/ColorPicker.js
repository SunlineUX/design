/* ============================================================
 * panels/ColorPicker.js — 主题色色板选择
 *   自注册到 window.PanelComponents，模板中使用 <color-picker>
 *
 *   用法：
 *     <color-picker
 *       v-model="state.themeColor"
 *       :options="enums.themeColor"
 *     />
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = global.PanelComponents || {};

  global.PanelComponents.ColorPicker = {
    props: {
      modelValue: { type: String, required: true },
      options: { type: Array, required: true }, // [{value, label, color}]
    },
    emits: ['update:modelValue'],
    template: `
      <div class="swatches">
        <span
          v-for="opt in options"
          :key="opt.value"
          class="swatch"
          :class="{ active: modelValue === opt.value }"
          :style="{ background: opt.color }"
          :title="opt.label"
          @click="$emit('update:modelValue', opt.value)"
        />
      </div>
    `,
  };
})(window);
