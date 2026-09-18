/* ============================================================
 * SpaceView.js — 间距展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SpaceView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const cHori = `<x-space size="md">
  <x-button>按钮</x-button>
  <x-button>按钮</x-button>
</x-space>`;
      const cVert = `<x-space vertical size="lg">
  <x-button>按钮</x-button>
  <x-button>按钮</x-button>
</x-space>`;
      return { t, cHori, cVert };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.space') }}</h1>
        <p class="text-secondary">间距容器用于统一管理元素之间的水平或垂直间距。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="水平间距 Horizontal" :code="cHori">
            <div style="display:flex;flex-direction:column;gap:16px">
              <div><x-badge>xs (4px)</x-badge></div>
              <x-space size="xs">
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
              </x-space>
              <x-divider />
              <div><x-badge>md (12px)</x-badge></div>
              <x-space size="md">
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
              </x-space>
              <x-divider />
              <div><x-badge variant="primary">xl (24px)</x-badge></div>
              <x-space size="xl">
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
              </x-space>
            </div>
          </x-demo-block>

          <x-demo-block title="垂直间距 Vertical" :code="cVert">
            <div style="display:flex;flex-direction:column;gap:16px">
              <div><x-badge>sm (8px)</x-badge></div>
              <x-space vertical size="sm">
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
              </x-space>
              <x-divider />
              <div><x-badge>lg (16px)</x-badge></div>
              <x-space vertical size="lg">
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
                <x-button size="sm">按钮</x-button>
              </x-space>
            </div>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);
