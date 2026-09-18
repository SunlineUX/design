/* ============================================================
 * base/XSpace.js — 间距容器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-space>
 *
 *   用法：
 *     <x-space>                          // 默认水平间距
 *       <x-button>按钮1</x-button>
 *       <x-button>按钮2</x-button>
 *     </x-space>
 *     <x-space vertical size="lg" />     // 垂直间距
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XSpace = {
    props: {
      vertical: { type: Boolean, default: false },
      size: { type: String, default: 'md' }, // xs | sm | md | lg | xl
      wrap: { type: Boolean, default: true },
    },
    setup(props) {
      const { computed } = global.Vue;
      const gapMap = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
      const style = computed(() => ({
        gap: (gapMap[props.size] || 12) + 'px',
        flexDirection: props.vertical ? 'column' : 'row',
        flexWrap: props.wrap ? 'wrap' : 'nowrap',
      }));
      return { style };
    },
    template: `
      <div class="x-space" :style="style">
        <slot />
      </div>
    `,
  };
})(window);
