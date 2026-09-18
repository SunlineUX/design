/* ============================================================
 * ModalView.js — 弹窗展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.ModalView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const open1 = ref(false);
      const open2 = ref(false);
      return { t, open1, open2 };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.modal') }}</h1>
        <p class="text-secondary">弹窗对话框，用于承载重要操作或信息。</p>

        <panel-card title="基础弹窗">
          <x-space size="lg">
            <x-button variant="primary" @click="open1 = true">打开弹窗</x-button>
            <x-button @click="open2 = true">确认弹窗</x-button>
          </x-space>

          <x-modal v-model="open1" title="提示信息">
            <p style="margin:0;color:var(--text-secondary)">这是一段弹窗内容，可以放置任意组件。</p>
            <template #footer>
              <x-button @click="open1 = false">取消</x-button>
              <x-button variant="primary" @click="open1 = false">确定</x-button>
            </template>
          </x-modal>

          <x-modal v-model="open2" title="确认删除" :width="400">
            <p style="margin:0;color:var(--text-secondary)">确定要删除这条记录吗？此操作不可恢复。</p>
            <template #footer>
              <x-button @click="open2 = false">取消</x-button>
              <x-button variant="warning" @click="open2 = false">删除</x-button>
            </template>
          </x-modal>
        </panel-card>
      </div>
    `,
  };
})(window);