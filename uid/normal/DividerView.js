/* ============================================================
 * DividerView.js — 分隔线展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.DividerView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      return { t };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.divider') }}</h1>
        <p class="text-secondary">分隔线用于区分内容区块，支持水平/垂直、实线/虚线、带文字。</p>

        <panel-card title="水平分隔线 Horizontal">
          <p style="margin:0">上方内容</p>
          <x-divider />
          <p style="margin:0">下方内容</p>
        </panel-card>

        <panel-card title="虚线分隔线 Dashed">
          <p style="margin:0">上方内容</p>
          <x-divider dashed />
          <p style="margin:0">下方内容</p>
        </panel-card>

        <panel-card title="带文字分隔线 With Text">
          <x-divider>分隔文字</x-divider>
          <x-divider dashed>虚线分隔</x-divider>
        </panel-card>

        <panel-card title="尺寸 Size">
          <x-divider size="sm" />
          <x-divider size="md" />
          <x-divider size="lg" />
        </panel-card>

        <panel-card title="垂直分隔线 Vertical">
          <div style="display:flex;align-items:stretch;height:80px;gap:0">
            <div style="padding:12px">左侧</div>
            <x-divider vertical />
            <div style="padding:12px">右侧</div>
            <x-divider vertical dashed />
            <div style="padding:12px">虚线分隔</div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
