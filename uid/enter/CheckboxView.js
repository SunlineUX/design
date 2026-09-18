/* ============================================================
 * CheckboxView.js — 复选框展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.CheckboxView = {
    setup() {
      const { inject, ref, computed } = global.Vue;
      const t = inject('t');
      const checked1 = ref(true);
      const checked2 = ref(false);
      const list = ref([{ label: '选项 A', checked: true }, { label: '选项 B', checked: false }, { label: '选项 C', checked: true }]);
      const allChecked = computed(() => list.value.every(i => i.checked));
      const toggleAll = () => list.value.forEach(i => i.checked = !allChecked.value);
      return { t, checked1, checked2, list, allChecked, toggleAll };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.checkbox') }}</h1>
        <p class="text-secondary">复选框，支持单个、分组、全选。</p>

        <panel-card title="单个复选框">
          <x-space vertical size="md">
            <x-checkbox v-model="checked1">已勾选</x-checkbox>
            <x-checkbox v-model="checked2">未勾选</x-checkbox>
            <x-checkbox :model-value="true" disabled>禁用-勾选</x-checkbox>
            <x-checkbox :model-value="false" disabled>禁用-未勾选</x-checkbox>
          </x-space>
        </panel-card>

        <panel-card title="全选 / 分组">
          <div style="display:flex;flex-direction:column;gap:12px">
            <x-checkbox :model-value="allChecked" @change="toggleAll">全选</x-checkbox>
            <x-divider size="sm" />
            <x-checkbox v-for="(item, i) in list" :key="i" v-model="item.checked">{{ item.label }}</x-checkbox>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);