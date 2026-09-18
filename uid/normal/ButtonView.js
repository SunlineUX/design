/* ============================================================
 * views/HomeView.js — 首页
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.ButtonView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const loading = ref(false);
      const handleClick = () => { loading.value = true; setTimeout(() => loading.value = false, 1500); };
      return { t, loading, handleClick };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.button') }}</h1>
        <p class="text-secondary">按钮支持多种变体、尺寸与状态。</p>

        <panel-card title="按钮变体 Variant">
          <x-space size="lg">
            <x-button>Default</x-button>
            <x-button variant="primary">Primary</x-button>
            <x-button variant="ghost">Ghost</x-button>
            <x-button variant="link">Link</x-button>
            <x-button variant="warning">Warning</x-button>
          </x-space>
        </panel-card>

        <panel-card title="按钮尺寸 Size">
          <x-space size="lg" align="center">
            <x-button size="sm">Small</x-button>
            <x-button size="md">Medium</x-button>
            <x-button size="lg">Large</x-button>
          </x-space>
        </panel-card>

        <panel-card title="禁用状态 Disabled">
          <x-space size="lg">
            <x-button disabled>Default</x-button>
            <x-button variant="primary" disabled>Primary</x-button>
            <x-button variant="ghost" disabled>Ghost</x-button>
          </x-space>
        </panel-card>

        <panel-card title="带图标 With Icon">
          <x-space size="lg">
            <x-button variant="primary"><x-icon name="Add" :size="14" /> 新建</x-button>
            <x-button variant="ghost"><x-icon name="Edit01" :size="14" /> 编辑</x-button>
            <x-button variant="warning"><x-icon name="Delete" :size="14" /> 删除</x-button>
          </x-space>
        </panel-card>

        <panel-card title="加载状态 Loading">
          <x-space size="lg">
            <x-button variant="primary" :disabled="loading" @click="handleClick">{{ loading ? '加载中...' : '点击加载' }}</x-button>
          </x-space>
        </panel-card>
      </div>
    `,
  };
})(window);
