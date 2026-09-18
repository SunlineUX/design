/* ============================================================
 * base/XFlexbox.js — 响应式等分布局容器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-flexbox>
 *
 *   用法：
 *     <x-flexbox :cols="3" gap="16">   // 固定 3 列等分
 *       <div>1</div><div>2</div><div>3</div>
 *     </x-flexbox>
 *
 *     <x-flexbox gap="16">              // 响应式：根据容器宽度自动列数
 *       <div>1</div>...                   // 1600px→4列, 1200→3列, 800→2列, <800→1列
 *     </x-flexbox>
 *
 *     <x-flexbox :breakpoints="[{minWidth:1000,cols:5},{minWidth:600,cols:2},{minWidth:0,cols:1}]">
 *       ...
 *     </x-flexbox>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XFlexbox = {
    props: {
      cols: { type: Number, default: 0 }, // 0 = 响应式自动
      gap: { type: [String, Number], default: 12 },
      breakpoints: {
        type: Array,
        default: () => [
          { minWidth: 1600, cols: 4 },
          { minWidth: 1200, cols: 3 },
          { minWidth: 800, cols: 2 },
          { minWidth: 0, cols: 1 },
        ],
      },
    },
    setup(props) {
      const { ref, computed, onMounted, onUnmounted } = global.Vue;
      const containerEl = ref(null);
      const containerWidth = ref(0);
      let resizeObserver = null;

      const currentCols = computed(() => {
        if (props.cols > 0) return props.cols;
        const sorted = [...props.breakpoints].sort((a, b) => b.minWidth - a.minWidth);
        const match = sorted.find(bp => containerWidth.value >= bp.minWidth);
        return match ? match.cols : 1;
      });

      const style = computed(() => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${currentCols.value}, minmax(0, 1fr))`,
        gap: (typeof props.gap === 'number' ? props.gap : parseInt(props.gap) || 12) + 'px',
      }));

      onMounted(() => {
        if (containerEl.value) {
          containerWidth.value = containerEl.value.clientWidth;
          resizeObserver = new ResizeObserver(entries => {
            const w = entries[0]?.contentRect?.width || 0;
            containerWidth.value = w;
          });
          resizeObserver.observe(containerEl.value);
        }
      });

      onUnmounted(() => {
        if (resizeObserver) resizeObserver.disconnect();
      });

      return { containerEl, style, currentCols };
    },
    template: `<div ref="containerEl" class="x-flexbox" :style="style"><slot /></div>`,
  };
})(window);
