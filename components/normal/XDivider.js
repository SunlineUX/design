/* ============================================================
 * base/XDivider.js — 分隔线（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-divider>
 *
 *   用法：
 *     <x-divider />                      // 水平分隔线
 *     <x-divider vertical />             // 垂直分隔线
 *     <x-divider dashed />               // 虚线
 *     <x-divider>文案</x-divider>        // 带文字
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XDivider = {
    props: {
      vertical: { type: Boolean, default: false },
      dashed: { type: Boolean, default: false },
      size: { type: String, default: 'md' }, // sm | md | lg
    },
    template: `
      <div
        :class="[
          'x-divider',
          vertical ? 'x-divider--vertical' : 'x-divider--horizontal',
          dashed && 'x-divider--dashed',
          'x-divider--' + size,
          $slots.default && 'x-divider--text'
        ]"
        role="separator"
      >
        <span v-if="$slots.default" class="x-divider__text"><slot /></span>
      </div>
    `,
  };
})(window);
