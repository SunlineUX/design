/* ============================================================
 * ColorView.js — 颜色展示
 *   自注册到 window.ViewComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.ColorView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');

      const themeColors = [
        { name: 'Primary', var: '--color-primary' },
        { name: 'Primary Hover', var: '--color-primary-hover' },
        { name: 'Primary Active', var: '--color-primary-active' },
        { name: 'Primary Soft', var: '--color-primary-soft' },
        { name: 'Secondary', var: '--color-secondary' },
        { name: 'Accent', var: '--color-accent' },
      ];
      const funcColors = [
        { name: 'Success', var: '--color-success' },
        { name: 'Warning', var: '--color-warning' },
        { name: 'Danger', var: '--color-danger' },
        { name: 'Info', var: '--color-info' },
      ];
      const textColors = [
        { name: 'Primary', var: '--text-primary' },
        { name: 'Secondary', var: '--text-secondary' },
        { name: 'Tertiary', var: '--text-tertiary' },
        { name: 'Inverse', var: '--text-inverse' },
      ];
      const bgColors = [
        { name: 'Page', var: '--bg-page' },
        { name: 'Surface', var: '--bg-surface' },
        { name: 'Surface 2', var: '--bg-surface-2' },
        { name: 'Surface 3', var: '--bg-surface-3' },
      ];

      return { t, themeColors, funcColors, textColors, bgColors };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.color') }}</h1>
        <p class="text-secondary">所有颜色均由 CSS 变量驱动，切换主题色或深浅模式时自动更新。</p>

        <panel-card title="主题色 Theme Color">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px">
            <div v-for="c in themeColors" :key="c.name" style="display:flex;flex-direction:column;gap:6px">
              <div :style="{ background: 'var(' + c.var + ')', height: 56, borderRadius: 'var(--radius-md)' }"></div>
              <span style="font-size:12px;font-weight:500">{{ c.name }}</span>
              <span style="font-size:11px;color:var(--text-tertiary)">{{ c.var }}</span>
            </div>
          </div>
        </panel-card>

        <panel-card title="功能色 Functional Color">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px">
            <div v-for="c in funcColors" :key="c.name" style="display:flex;flex-direction:column;gap:6px">
              <div :style="{ background: 'var(' + c.var + ')', height: 56, borderRadius: 'var(--radius-md)' }"></div>
              <span style="font-size:12px;font-weight:500">{{ c.name }}</span>
              <span style="font-size:11px;color:var(--text-tertiary)">{{ c.var }}</span>
            </div>
          </div>
        </panel-card>

        <panel-card title="文字色 Text Color">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px">
            <div v-for="c in textColors" :key="c.name" style="display:flex;flex-direction:column;gap:6px">
              <div :style="{ background: 'var(' + c.var + ')', height: 56, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }"></div>
              <span style="font-size:12px;font-weight:500">{{ c.name }}</span>
              <span style="font-size:11px;color:var(--text-tertiary)">{{ c.var }}</span>
            </div>
          </div>
        </panel-card>

        <panel-card title="背景色 Background Color">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px">
            <div v-for="c in bgColors" :key="c.name" style="display:flex;flex-direction:column;gap:6px">
              <div :style="{ background: 'var(' + c.var + ')', height: 56, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }"></div>
              <span style="font-size:12px;font-weight:500">{{ c.name }}</span>
              <span style="font-size:11px;color:var(--text-tertiary)">{{ c.var }}</span>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
