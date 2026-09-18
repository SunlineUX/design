/* ============================================================
 * GridView.js — 网格展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.GridView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      return { t };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.grid') }}</h1>
        <p class="text-secondary">基于 CSS Grid 的栅格系统，支持自适应列数。</p>

        <panel-card title="2 列 Grid 2">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
            <div v-for="i in 4" :key="i" style="background:var(--color-primary-soft);height:60px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-primary)">{{ i }}</div>
          </div>
        </panel-card>

        <panel-card title="3 列 Grid 3">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
            <div v-for="i in 6" :key="i" style="background:var(--color-primary-soft);height:60px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-primary)">{{ i }}</div>
          </div>
        </panel-card>

        <panel-card title="4 列 Grid 4">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            <div v-for="i in 8" :key="i" style="background:var(--color-primary-soft);height:60px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-primary)">{{ i }}</div>
          </div>
        </panel-card>

        <panel-card title="自适应 Auto-fit">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px">
            <div v-for="i in 6" :key="i" style="background:var(--color-primary-soft);height:60px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-primary)">{{ i }}</div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
