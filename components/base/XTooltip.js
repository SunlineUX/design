/* ============================================================
 * base/XTooltip.js — 文字提示气泡（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-tooltip>
 *
 *   纯 CSS 驱动（hover / 键盘 focus 自动显示），无 JS 状态：
 *     <x-tooltip content="点击折叠侧边栏" placement="top">
 *       <x-icon name="settings" :size="18" />
 *     </x-tooltip>
 *
 *   - placement：top（默认）| bottom | left | right
 *   - 触发器内元素可获得焦点时（按钮/链接/输入框），聚焦也会显示
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XTooltip = {
    props: {
      content: { type: String, required: true },
      placement: { type: String, default: 'top' }, // top | bottom | left | right
    },
    template: `
      <span class="x-tooltip" :class="'x-tooltip--' + placement">
        <span class="x-tooltip__trigger"><slot /></span>
        <span class="x-tooltip__inner" role="tooltip">
          {{ content }}
          <span class="x-tooltip__arrow" :class="'x-tooltip__arrow--' + placement"></span>
        </span>
      </span>
    `,
  };
})(window);
