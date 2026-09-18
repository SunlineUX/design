/* ============================================================
 * LoadingView.js — 加载中展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.LoadingView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const loading = ref(false);
      const show = () => { loading.value = true; setTimeout(() => loading.value = false, 2000); };
      const cLoading = `<x-loading v-model="loading" text="数据加载中..." fullscreen />`;
      return { t, loading, show, cLoading };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.loading') }}</h1>
        <p class="text-secondary">全屏加载遮罩，用于异步操作时的等待状态。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="全屏加载" :code="cLoading">
            <x-button variant="primary" @click="show">触发加载（2秒后关闭）</x-button>
            <x-loading v-model="loading" text="数据加载中..." fullscreen />
          </x-demo-block>

          <x-demo-block title="自定义文案" :code="`<x-loading :model-value="true" text="处理中..." />`">
            <x-loading :model-value="true" text="正在处理，请稍候..." />
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);