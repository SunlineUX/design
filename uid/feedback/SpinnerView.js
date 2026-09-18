/* ============================================================
 * SpinnerView.js — 旋转加载展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SpinnerView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      return { t };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.spinner') }}</h1>
        <p class="text-secondary">旋转加载图标，用于局部加载状态。</p>

        <panel-card title="尺寸">
          <x-space size="xl" align="center">
            <x-spinner :size="16" />
            <x-spinner :size="24" />
            <x-spinner :size="32" />
            <x-spinner :size="48" />
            <x-spinner :size="64" />
          </x-space>
        </panel-card>

        <panel-card title="颜色">
          <x-space size="xl" align="center">
            <x-spinner :size="32" color="var(--color-primary)" />
            <x-spinner :size="32" color="var(--color-success)" />
            <x-spinner :size="32" color="var(--color-warning)" />
            <x-spinner :size="32" color="var(--color-danger)" />
          </x-space>
        </panel-card>

        <panel-card title="按钮中使用">
          <x-space size="md">
            <x-button variant="primary" disabled><x-spinner :size="14" color="#fff" /> 加载中</x-button>
            <x-button disabled><x-spinner :size="14" /> 处理中</x-button>
          </x-space>
        </panel-card>
      </div>
    `,
  };
})(window);