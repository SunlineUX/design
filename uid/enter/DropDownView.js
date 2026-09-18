/* ============================================================
 * DropdownView.js — 下拉菜单展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.DropdownView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const cDropdown = `<x-dropdown>
  <x-button>更多操作</x-button>
  <template #menu>
    <div class="x-dropdown-item" data-value="edit">编辑</div>
    <div class="x-dropdown-item" data-value="copy">复制</div>
    <div class="x-dropdown-divider"></div>
    <div class="x-dropdown-item x-dropdown-item--danger" data-value="delete">删除</div>
  </template>
</x-dropdown>`;
      const cHover = `<x-dropdown trigger="hover" placement="bottom-end">
  <x-button>Hover 触发</x-button>
  <template #menu>
    <div class="x-dropdown-item">选项 A</div>
  </template>
</x-dropdown>`;
      return { t, cDropdown, cHover };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.dropdown') }}</h1>
        <p class="text-secondary">下拉菜单，支持点击/hover 触发，可包含菜单项、分隔线、危险操作。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="基础下拉菜单" :code="cDropdown">
            <x-dropdown>
              <x-button>更多操作 <x-icon name="ArrowDown" :size="14" /></x-button>
              <template #menu>
                <div class="x-dropdown-item" data-value="edit"><x-icon name="Edit" :size="14" /> 编辑</div>
                <div class="x-dropdown-item" data-value="copy"><x-icon name="Copy" :size="14" /> 复制</div>
                <div class="x-dropdown-divider"></div>
                <div class="x-dropdown-item x-dropdown-item--danger" data-value="delete"><x-icon name="Delete" :size="14" /> 删除</div>
              </template>
            </x-dropdown>
          </x-demo-block>

          <x-demo-block title="Hover 触发" :code="cHover">
            <x-dropdown trigger="hover" placement="top-start">
              <x-button variant="ghost">Hover 触发</x-button>
              <template #menu>
                <div class="x-dropdown-item" data-value="a">选项 A</div>
                <div class="x-dropdown-item" data-value="b">选项 B</div>
                <div class="x-dropdown-item" data-value="c" style="opacity:.4">禁用选项</div>
              </template>
            </x-dropdown>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);