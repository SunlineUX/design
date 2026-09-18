/* ============================================================
 * FontView.js — 字体展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.FontView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');

      const fontSizes = [
        { name: 'xs', size: 'var(--font-size-xs)', sample: '极小号文字' },
        { name: 'sm', size: 'var(--font-size-sm)', sample: '小号文字' },
        { name: 'base', size: 'var(--font-size-base)', sample: '基础大小文字' },
        { name: 'md', size: 'var(--font-size-md)', sample: '中等大小文字' },
        { name: 'lg', size: 'var(--font-size-lg)', sample: '大号文字' },
        { name: 'xl', size: 'var(--font-size-xl)', sample: '超大号文字' },
        { name: '2xl', size: 'var(--font-size-2xl)', sample: '特大号文字' },
      ];
      const fontWeights = [
        { name: 'Light', value: 300 },
        { name: 'Regular', value: 400 },
        { name: 'Medium', value: 500 },
        { name: 'Semibold', value: 600 },
        { name: 'Bold', value: 700 },
      ];

      return { t, fontSizes, fontWeights };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.font') }}</h1>
        <p class="text-secondary">字体族：var(--font-sans)，等宽字体：var(--font-mono)。</p>

        <panel-card title="字体族 Font Family">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div style="font-family:var(--font-sans);font-size:20px">无衬线字体 Sans Serif — 设计工程框架 ABC123</div>
            <div style="font-family:var(--font-mono);font-size:18px;background:var(--bg-surface-2);padding:12px;border-radius:var(--radius-md)">等宽字体 Mono — const code = 123;</div>
          </div>
        </panel-card>

        <panel-card title="字号 Font Size">
          <div style="display:flex;flex-direction:column;gap:12px">
            <div v-for="f in fontSizes" :key="f.name" style="display:flex;align-items:baseline;gap:16px">
              <span style="width:80px;color:var(--text-tertiary);font-size:12px">{{ f.name }} ({{ f.size }})</span>
              <span :style="{ fontSize: f.size }">{{ f.sample }}</span>
            </div>
          </div>
        </panel-card>

        <panel-card title="字重 Font Weight">
          <div style="display:flex;flex-direction:column;gap:12px">
            <div v-for="w in fontWeights" :key="w.name" style="display:flex;align-items:center;gap:16px">
              <span style="width:80px;color:var(--text-tertiary);font-size:12px">{{ w.name }} ({{ w.value }})</span>
              <span style="font-size:18px" :style="{ fontWeight: w.value }">设计工程框架 Design</span>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
