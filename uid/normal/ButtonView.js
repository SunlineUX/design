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
      const cVariant = `<x-button>Default</x-button>
<x-button variant="primary">Primary</x-button>
<x-button variant="ghost">Ghost</x-button>
<x-button variant="link">Link</x-button>
<x-button variant="warning">Warning</x-button>`;
      const cSize = `<x-button size="sm">Small</x-button>
<x-button size="md">Medium</x-button>
<x-button size="lg">Large</x-button>`;
      const cDisabled = `<x-button disabled>Default</x-button>
<x-button variant="primary" disabled>Primary</x-button>`;
      const cIcon = `<x-button variant="primary"><x-icon name="Add" :size="14" /> 新建</x-button>
<x-button variant="ghost"><x-icon name="Edit01" :size="14" /> 编辑</x-button>`;
      const cLoading = `<x-button variant="primary" :disabled="loading" @click="handleClick">
  {{ loading ? '加载中...' : '点击加载' }}
</x-button>`;
      return { t, loading, handleClick, cVariant, cSize, cDisabled, cIcon, cLoading };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.button') }}</h1>
        <p class="text-secondary">按钮支持多种变体、尺寸与状态。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="按钮变体 Variant" :code="cVariant">
            <x-space size="lg">
              <x-button>Default</x-button>
              <x-button variant="primary">Primary</x-button>
              <x-button variant="ghost">Ghost</x-button>
              <x-button variant="link">Link</x-button>
              <x-button variant="warning">Warning</x-button>
            </x-space>
          </x-demo-block>

          <x-demo-block title="按钮尺寸 Size" :code="cSize">
            <x-space size="lg" align="center">
              <x-button size="sm">Small</x-button>
              <x-button size="md">Medium</x-button>
              <x-button size="lg">Large</x-button>
            </x-space>
          </x-demo-block>

          <x-demo-block title="禁用状态 Disabled" :code="cDisabled">
            <x-space size="lg">
              <x-button disabled>Default</x-button>
              <x-button variant="primary" disabled>Primary</x-button>
              <x-button variant="ghost" disabled>Ghost</x-button>
            </x-space>
          </x-demo-block>

          <x-demo-block title="带图标 With Icon" :code="cIcon">
            <x-space size="lg">
              <x-button variant="primary"><x-icon name="Add" :size="14" /> 新建</x-button>
              <x-button variant="ghost"><x-icon name="Edit01" :size="14" /> 编辑</x-button>
              <x-button variant="warning"><x-icon name="Delete" :size="14" /> 删除</x-button>
            </x-space>
          </x-demo-block>

          <x-demo-block title="加载状态 Loading" :code="cLoading">
            <x-button variant="primary" :disabled="loading" @click="handleClick">{{ loading ? '加载中...' : '点击加载' }}</x-button>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);
