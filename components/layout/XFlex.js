/* ============================================================
 * base/XFlexbox.js — 弹性布局容器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-flexbox>
 *
 *   用法：
 *     <x-flexbox justify="center" align="center" gap="12">
 *       <div>1</div><div>2</div>
 *     </x-flexbox>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XFlexbox = {
    props: {
      direction: { type: String, default: 'row' }, // row | column | row-reverse | column-reverse
      justify: { type: String, default: 'flex-start' }, // flex-start | center | flex-end | space-between | space-around
      align: { type: String, default: 'stretch' }, // flex-start | center | flex-end | stretch | baseline
      wrap: { type: Boolean, default: true },
      gap: { type: [String, Number], default: 12 },
    },
    setup(props) {
      const { computed } = global.Vue;
      const style = computed(() => ({
        display: 'flex',
        flexDirection: props.direction,
        justifyContent: props.justify,
        alignItems: props.align,
        flexWrap: props.wrap ? 'wrap' : 'nowrap',
        gap: (typeof props.gap === 'number' ? props.gap : parseInt(props.gap) || 12) + 'px',
      }));
      return { style };
    },
    template: `<div class="x-flexbox" :style="style"><slot /></div>`,
  };
})(window);
