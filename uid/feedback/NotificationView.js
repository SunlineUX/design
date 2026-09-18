/* ============================================================
 * NotificationView.js — 通知展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.NotificationView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const notifyInfo = () => window.XNotification.info({ title: '系统提示', message: '您有 3 条新消息待查看。' });
      const notifySuccess = () => window.XNotification.success({ title: '保存成功', message: '配置已成功保存到服务器。' });
      const notifyWarning = () => window.XNotification.warning({ title: '存储空间不足', message: '剩余空间不足 10%，请及时清理。' });
      const notifyError = () => window.XNotification.error({ title: '网络错误', message: '无法连接到服务器，请检查网络。' });
      const cNotify = `window.XNotification.info({
  title: '系统提示',
  message: '您有 3 条新消息待查看。'
});`;
      return { t, notifyInfo, notifySuccess, notifyWarning, notifyError, cNotify };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.notification') }}</h1>
        <p class="text-secondary">通知组件，从右上角滑入，带标题和正文。</p>

        <x-waterfall :columns="1" :gap="16">
          <x-demo-block title="四种类型" :code="cNotify">
            <x-space size="md" wrap>
              <x-button @click="notifyInfo">Info 通知</x-button>
              <x-button variant="primary" @click="notifySuccess">Success 通知</x-button>
              <x-button variant="warning" @click="notifyWarning">Warning 通知</x-button>
              <x-button style="background:var(--color-danger);border-color:var(--color-danger);color:#fff" @click="notifyError">Error 通知</x-button>
            </x-space>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);