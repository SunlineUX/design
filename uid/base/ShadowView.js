/* ============================================================
 * ShadowView.js — 阴影展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.ShadowView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');

      const shadows = [
        { name: 'sm', var: '--shadow-sm', desc: '小阴影（卡片、按钮）' },
        { name: 'md', var: '--shadow-md', desc: '中阴影（浮层、弹窗）' },
        { name: 'lg', var: '--shadow-lg', desc: '大阴影（模态框、浮层）' },
      ];

      return { t, shadows };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.shadow') }}</h1>
        <p class="text-secondary">阴影层级用于区分元素深度，自动适配深浅模式。</p>

        <panel-card title="阴影层级 Shadow Levels">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:24px">
            <div v-for="s in shadows" :key="s.name" style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:24px">
              <div :style="{ width: '120px', height: '80px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(' + s.var + ')' }"></div>
              <span style="font-weight:500">{{ s.name }}</span>
              <span style="font-size:12px;color:var(--text-tertiary)">{{ s.desc }}</span>
              <code style="font-size:11px">{{ s.var }}</code>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
