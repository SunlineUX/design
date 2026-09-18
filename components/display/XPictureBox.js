/* ============================================================
 * base/XPictureBox.js — 可拖拽分隔器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-picture-box>
 *
 *   注意：组件名 XPictureBox 对应标签 <x-picture-box>，
 *   但实际语义为"可拖拽分屏"，用于 Spliter 示例。
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XPictureBox = {
    props: {
      title: { type: String, default: '' },
      bg: { type: String, default: 'var(--color-primary-soft)' },
    },
    template: `
      <div class="x-picture-box" :style="{ background: bg }">
        <div v-if="title" class="x-picture-box__title">{{ title }}</div>
        <slot />
      </div>
    `,
  };
})(window);
