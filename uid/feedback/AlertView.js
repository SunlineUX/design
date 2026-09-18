/* ============================================================
 * AlertView.js — 警告提示展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.AlertView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const show = ref(true);
      return { t, show };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.alert') }}</h1>
        <p class="text-secondary">警告提示横幅，用于展示重要信息。</p>

        <panel-card title="四种类型">
          <div style="display:flex;flex-direction:column;gap:12px">
            <x-alert type="info" title="信息提示">这是一条信息提示。</x-alert>
            <x-alert type="success" title="成功提示">操作已成功完成。</x-alert>
            <x-alert type="warning" title="警告提示">请注意，存在潜在风险。</x-alert>
            <x-alert type="error" title="错误提示">操作失败，请重试。</x-alert>
          </div>
        </panel-card>

        <panel-card title="可关闭">
          <x-alert v-if="show" type="warning" title="注意" closable @close="show = false">这是一条可关闭的警告提示，点击右侧 × 关闭。</x-alert>
          <x-button v-else size="sm" @click="show = true">重新显示</x-button>
        </panel-card>
      </div>
    `,
  };
})(window);