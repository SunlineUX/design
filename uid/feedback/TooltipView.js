/* ============================================================
 * TooltipView.js — 文字提示展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.TooltipView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const cTooltip = `<x-tooltip content="提示内容" placement="top">
  <x-button>按钮</x-button>
</x-tooltip>`;
      return { t, cTooltip };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.tooltip') }}</h1>
        <p class="text-secondary">文字提示气泡，hover 或 focus 时显示。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="四个方向" :code="cTooltip">
            <div style="display:flex;gap:32px;justify-content:center;padding:32px 0">
              <x-tooltip content="上侧提示" placement="top"><x-button>上</x-button></x-tooltip>
              <x-tooltip content="下侧提示" placement="bottom"><x-button>下</x-button></x-tooltip>
              <x-tooltip content="左侧提示" placement="left"><x-button>左</x-button></x-tooltip>
              <x-tooltip content="右侧提示" placement="right"><x-button>右</x-button></x-tooltip>
            </div>
          </x-demo-block>

          <x-demo-block title="不同触发器" :code="cTooltip">
            <x-space size="lg" align="center">
              <x-tooltip content="按钮提示" placement="top"><x-button variant="primary">按钮</x-button></x-tooltip>
              <x-tooltip content="图标提示" placement="top"><x-icon name="SettingFilled" :size="20" style="cursor:pointer" /></x-tooltip>
              <x-tooltip content="长文字提示信息可以自动换行显示" placement="top"><x-button>长文字</x-button></x-tooltip>
            </x-space>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);