/* ============================================================
 * MessageView.js — 消息提示展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.MessageView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const showInfo = () => window.XMessage.info('这是一条普通消息');
      const showSuccess = () => window.XMessage.success('操作成功！');
      const showWarning = () => window.XMessage.warning('请注意，这是一条警告');
      const showError = () => window.XMessage.error('操作失败，请重试');
      const cMsg = `// 命令式调用
window.XMessage.info('这是一条普通消息');
window.XMessage.success('操作成功！');
window.XMessage.warning('警告');
window.XMessage.error('错误');`;
      return { t, showInfo, showSuccess, showWarning, showError, cMsg };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.message') }}</h1>
        <p class="text-secondary">全局消息提示，从顶部滑入，自动消失。</p>

        <x-waterfall :columns="1" :gap="16">
          <x-demo-block title="四种类型" :code="cMsg">
            <x-space size="md" wrap>
              <x-button @click="showInfo">Info 消息</x-button>
              <x-button variant="primary" @click="showSuccess">Success 消息</x-button>
              <x-button variant="warning" @click="showWarning">Warning 消息</x-button>
              <x-button style="background:var(--color-danger);border-color:var(--color-danger);color:#fff" @click="showError">Error 消息</x-button>
            </x-space>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);