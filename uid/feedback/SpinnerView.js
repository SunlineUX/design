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
      const cSize = `<x-spinner :size="24" />
<x-spinner :size="48" />`;
      const cColor = `<x-spinner :size="32" color="var(--color-primary)" />
<x-spinner :size="32" color="var(--color-success)" />`;
      return { t, cSize, cColor };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.spinner') }}</h1>
        <p class="text-secondary">旋转加载图标，用于局部加载状态。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="尺寸" :code="cSize">
            <x-space size="xl" align="center">
              <x-spinner :size="16" />
              <x-spinner :size="24" />
              <x-spinner :size="32" />
              <x-spinner :size="48" />
              <x-spinner :size="64" />
            </x-space>
          </x-demo-block>

          <x-demo-block title="颜色" :code="cColor">
            <x-space size="xl" align="center">
              <x-spinner :size="32" color="var(--color-primary)" />
              <x-spinner :size="32" color="var(--color-success)" />
              <x-spinner :size="32" color="var(--color-warning)" />
              <x-spinner :size="32" color="var(--color-danger)" />
            </x-space>
          </x-demo-block>

          <x-demo-block title="按钮中使用" :code="`<x-button disabled><x-spinner :size=\"14\" /> 加载中</x-button>`">
            <x-space size="md">
              <x-button variant="primary" disabled><x-spinner :size="14" color="#fff" /> 加载中</x-button>
              <x-button disabled><x-spinner :size="14" /> 处理中</x-button>
            </x-space>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);