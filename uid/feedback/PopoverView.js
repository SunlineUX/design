/* ============================================================
 * PopoverView.js — 气泡浮层展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.PopoverView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      return { t };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.popover') }}</h1>
        <p class="text-secondary">气泡浮层，可承载更丰富的内容（标题、正文、操作按钮）。</p>

        <panel-card title="基础用法">
          <x-space size="lg">
            <x-popover trigger="hover" placement="bottom" title="提示标题" :show-arrow="true">
              <template #content>
                <p style="margin:0;font-size:13px;color:var(--text-secondary)">这是一段浮层内容，可以放置任意 HTML。</p>
              </template>
              <x-button>Hover 查看</x-button>
            </x-popover>

            <x-popover trigger="click" placement="right" title="操作确认">
              <template #content>
                <p style="margin:0 0 12px;font-size:13px;color:var(--text-secondary)">确定执行此操作？</p>
                <x-space size="sm">
                  <x-button size="sm">取消</x-button>
                  <x-button size="sm" variant="primary">确定</x-button>
                </x-space>
              </template>
              <x-button variant="primary">点击触发</x-button>
            </x-popover>
          </x-space>
        </panel-card>
      </div>
    `,
  };
})(window);