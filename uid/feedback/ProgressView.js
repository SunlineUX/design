/* ============================================================
 * ProgressView.js — 进度条展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.ProgressView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const p = ref(30);
      const inc = () => { p.value = Math.min(100, p.value + 10); };
      const dec = () => { p.value = Math.max(0, p.value - 10); };
      return { t, p, inc, dec };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.progress') }}</h1>
        <p class="text-secondary">进度条，支持线性和圆形两种形态。</p>

        <panel-card title="线性进度条">
          <div style="display:flex;flex-direction:column;gap:16px;max-width:480px">
            <x-progress :percent="0" />
            <x-progress :percent="30" />
            <x-progress :percent="70" color="var(--color-success)" />
            <x-progress :percent="100" />
          </div>
        </panel-card>

        <panel-card title="可交互">
          <x-space size="md" align="center" style="margin-bottom:16px">
            <x-button @click="dec">-10</x-button>
            <x-button variant="primary" @click="inc">+10</x-button>
          </x-space>
          <x-progress :percent="p" />
        </panel-card>

        <panel-card title="圆形进度">
          <x-space size="xl">
            <x-progress type="circle" :percent="30" :size="100" />
            <x-progress type="circle" :percent="60" :size="100" color="var(--color-success)" />
            <x-progress type="circle" :percent="90" :size="100" color="var(--color-warning)" />
          </x-space>
        </panel-card>
      </div>
    `,
  };
})(window);