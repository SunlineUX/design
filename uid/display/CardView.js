/* ============================================================
 * CardView.js — 卡片展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.CardView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const cCard = `<x-card title="卡片标题">
  <p>卡片内容</p>
</x-card>`;
      const cHoverable = `<x-card title="带操作" hoverable>
  <p>支持 hover 浮起效果。</p>
  <x-button size="sm" variant="primary">查看详情</x-button>
</x-card>`;
      return { t, cCard, cHoverable };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.card') }}</h1>
        <p class="text-secondary">卡片容器，用于承载信息、图片、操作等。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="基础卡片" :code="cCard">
            <x-card title="卡片标题">
              <p style="color:var(--text-secondary);margin:0">这是卡片内容，可以放置任意信息。</p>
            </x-card>
          </x-demo-block>

          <x-demo-block title="带操作 Hoverable" :code="cHoverable">
            <x-card title="带操作" hoverable>
              <p style="color:var(--text-secondary);margin:0 0 12px">支持 hover 浮起效果。</p>
              <x-button size="sm" variant="primary">查看详情</x-button>
            </x-card>
          </x-demo-block>

          <x-demo-block title="图片卡片" :code="cCard">
            <x-card hoverable>
              <div style="height:120px;background:linear-gradient(135deg,var(--color-primary-soft),var(--color-primary));border-radius:var(--radius-md);margin:-20px -20px 12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px">🎨</div>
              <div style="font-weight:600;margin-bottom:4px">图片卡片</div>
              <div style="color:var(--text-tertiary);font-size:13px">带封面图的卡片样式</div>
            </x-card>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);