/* ============================================================
 * SizeView.js — 尺寸规格展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SizeView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');

      const spaces = [
        { name: 'xs', var: '--space-xs', px: 4 },
        { name: 'sm', var: '--space-sm', px: 8 },
        { name: 'md', var: '--space-md', px: 12 },
        { name: 'lg', var: '--space-lg', px: 16 },
        { name: 'xl', var: '--space-xl', px: 24 },
        { name: '2xl', var: '--space-2xl', px: 32 },
        { name: '3xl', var: '--space-3xl', px: 48 },
      ];
      const radii = [
        { name: 'sm', var: '--radius-sm' },
        { name: 'md', var: '--radius-md' },
        { name: 'lg', var: '--radius-lg' },
        { name: 'xl', var: '--radius-xl' },
        { name: 'pill', var: '--radius-pill' },
        { name: 'control', var: '--radius-control' },
        { name: 'card', var: '--radius-card' },
      ];

      return { t, spaces, radii };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.size') }}</h1>
        <p class="text-secondary">间距与圆角规格，受 data-density 和 data-radius 控制。</p>

        <panel-card title="间距 Spacing">
          <div style="display:flex;flex-direction:column;gap:12px">
            <div v-for="s in spaces" :key="s.name" style="display:flex;align-items:center;gap:12px">
              <span style="width:60px;color:var(--text-tertiary);font-size:12px">{{ s.name }} ({{ s.px }}px)</span>
              <div :style="{ width: s.px + 'px', height: '24px', background: 'var(--color-primary-soft)', borderRadius: 'var(--radius-sm)' }"></div>
            </div>
          </div>
        </panel-card>

        <panel-card title="圆角 Radius">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:16px">
            <div v-for="r in radii" :key="r.name" style="display:flex;flex-direction:column;align-items:center;gap:6px">
              <div :style="{ width: '60px', height: '60px', background: 'var(--color-primary-soft)', borderRadius: 'var(' + r.var + ')' }"></div>
              <span style="font-size:12px">{{ r.name }}</span>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
