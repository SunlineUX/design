/* ============================================================
 * base/XCard.js — 卡片容器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-card>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XCard = {
    props: {
      title: { type: String, default: '' },
      hoverable: { type: Boolean, default: false },
      bordered: { type: Boolean, default: true },
    },
    template: `
      <div :class="['x-card', hoverable && 'x-card--hoverable', bordered && 'x-card--bordered']">
        <div v-if="title" class="x-card__header">
          <span class="x-card__title">{{ title }}</span>
          <slot name="extra" />
        </div>
        <div class="x-card__body"><slot /></div>
      </div>
    `,
  };
})(window);
