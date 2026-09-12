/* ============================================================
 * panels/PanelCard.js — 通用卡片容器
 *   自注册到 window.PanelComponents，模板中使用 <panel-card>
 *
 *   用法：
 *     <panel-card title="标题" elevated>
 *       任意内容…
 *     </panel-card>
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = global.PanelComponents || {};

  global.PanelComponents.PanelCard = {
    props: {
      title: { type: String, default: '' },
      elevated: { type: Boolean, default: false },
    },
    template: `
      <div :class="['card', elevated && 'card-elevated', 'panel-card']">
        <div v-if="title" class="panel-card-title">{{ title }}</div>
        <div class="panel-card-body"><slot /></div>
      </div>
    `,
  };
})(window);
