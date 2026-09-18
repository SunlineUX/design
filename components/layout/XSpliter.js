/* ============================================================
 * base/XSpliter.js — 可拖拽分屏分隔器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-spliter>
 *
 *   用法：
 *     <x-spliter :default-size="40" min="20" max="70">
 *       <template #first> 左/上 内容 </template>
 *       <template #second> 右/下 内容 </template>
 *     </x-spliter>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XSpliter = {
    props: {
      direction: { type: String, default: 'horizontal' }, // horizontal | vertical
      defaultSize: { type: Number, default: 50 }, // 第一块百分比
      min: { type: Number, default: 10 },
      max: { type: Number, default: 90 },
    },
    setup(props) {
      const { ref } = global.Vue;
      const size = ref(props.defaultSize);
      const dragging = ref(false);
      const containerEl = ref(null);

      function onMouseDown(e) {
        e.preventDefault();
        dragging.value = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
      function onMouseMove(e) {
        if (!containerEl.value) return;
        const rect = containerEl.value.getBoundingClientRect();
        let pct;
        if (props.direction === 'horizontal') {
          pct = ((e.clientX - rect.left) / rect.width) * 100;
        } else {
          pct = ((e.clientY - rect.top) / rect.height) * 100;
        }
        size.value = Math.min(props.max, Math.max(props.min, pct));
      }
      function onMouseUp() {
        dragging.value = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      return { size, dragging, onMouseDown, containerEl };
    },
    template: `
      <div
        ref="containerEl"
        class="x-spliter"
        :class="{ 'x-spliter--vertical': direction === 'vertical', 'x-spliter--dragging': dragging }"
      >
        <div class="x-spliter__pane x-spliter__pane--first" :style="direction === 'horizontal' ? { width: size + '%' } : { height: size + '%' }">
          <slot name="first" />
        </div>
        <div
          class="x-spliter__handle"
          @mousedown="onMouseDown"
          role="separator"
          :aria-orientation="direction === 'horizontal' ? 'vertical' : 'horizontal'"
        >
          <div class="x-spliter__handle-line"></div>
        </div>
        <div class="x-spliter__pane x-spliter__pane--second">
          <slot name="second" />
        </div>
      </div>
    `,
  };
})(window);
