/* ============================================================
 * base/XLoading.js — 全屏加载遮罩（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-loading>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XLoading = {
    props: {
      modelValue: { type: Boolean, default: false },
      text: { type: String, default: '加载中...' },
      fullscreen: { type: Boolean, default: false },
    },
    template: `
      <teleport to="body">
        <transition name="x-loading">
          <div v-if="modelValue" class="x-loading" :class="{ 'x-loading--fullscreen': fullscreen }">
            <div class="x-loading__spinner"><x-spinner :size="40" /></div>
            <div v-if="text" class="x-loading__text">{{ text }}</div>
          </div>
        </transition>
      </teleport>
    `,
  };
})(window);
