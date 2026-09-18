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
      const cHori = `<x-divider />`;
      const cDashed = `<x-divider dashed />`;
      const cText = `<x-divider>分隔文字</x-divider>
<x-divider dashed>虚线分隔</x-divider>`;
      const cSize = `<x-divider size="sm" />
<x-divider size="md" />
<x-divider size="lg" />`;
      const cVert = `<x-divider vertical />
<x-divider vertical dashed />`;
      return { t, cHori, cDashed, cText, cSize, cVert };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.divider') }}</h1>
        <p class="text-secondary">分隔线用于区分内容区块，支持水平/垂直、实线/虚线、带文字。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="水平分隔线 Horizontal" :code="cHori">
            <p style="margin:0">上方内容</p>
            <x-divider />
            <p style="margin:0">下方内容</p>
          </x-demo-block>

          <x-demo-block title="虚线分隔线 Dashed" :code="cDashed">
            <p style="margin:0">上方内容</p>
            <x-divider dashed />
            <p style="margin:0">下方内容</p>
          </x-demo-block>

          <x-demo-block title="带文字分隔线 With Text" :code="cText">
            <x-divider>分隔文字</x-divider>
            <x-divider dashed>虚线分隔</x-divider>
          </x-demo-block>

          <x-demo-block title="尺寸 Size" :code="cSize">
            <x-divider size="sm" />
            <x-divider size="md" />
            <x-divider size="lg" />
          </x-demo-block>

          <x-demo-block title="垂直分隔线 Vertical" :code="cVert">
            <div style="display:flex;align-items:stretch;height:80px;gap:0">
              <div style="padding:12px">左侧</div>
              <x-divider vertical />
              <div style="padding:12px">右侧</div>
              <x-divider vertical dashed />
              <div style="padding:12px">虚线分隔</div>
            </div>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);
