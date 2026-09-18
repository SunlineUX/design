/* ============================================================
 * RadioView.js — 单选框展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.RadioView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const radio = ref('a');
      const size = ref('md');
      const cRadio = `<div class="x-radio-group">
  <x-radio v-model="radio" value="a">选项 A</x-radio>
  <x-radio v-model="radio" value="b">选项 B</x-radio>
  <x-radio v-model="radio" value="c">选项 C</x-radio>
</div>`;
      return { t, radio, size, cRadio };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.radio') }}</h1>
        <p class="text-secondary">单选框，同一组内只能选择一个。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="基础单选" :code="cRadio">
            <div class="x-radio-group">
              <x-radio v-model="radio" value="a">选项 A</x-radio>
              <x-radio v-model="radio" value="b">选项 B</x-radio>
              <x-radio v-model="radio" value="c">选项 C</x-radio>
            </div>
            <div style="margin-top:12px;color:var(--text-tertiary);font-size:13px">当前选中：{{ radio }}</div>
          </x-demo-block>

          <x-demo-block title="禁用状态" :code="cRadio">
            <div class="x-radio-group">
              <x-radio v-model="size" value="sm">小</x-radio>
              <x-radio v-model="size" value="md">中</x-radio>
              <x-radio v-model="size" value="lg" disabled>大（禁用）</x-radio>
            </div>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);