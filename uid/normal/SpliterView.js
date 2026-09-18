/* ============================================================
 * SpliterView.js — 可拖拽分屏展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SpliterView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const cHori = `<x-spliter :default-size="35" :min="20" :max="80">
  <template #first><div>左侧</div></template>
  <template #second><div>右侧</div></template>
</x-spliter>`;
      const cVert = `<x-spliter direction="vertical" :default-size="40" :min="20" :max="80">
  <template #first><div>顶部</div></template>
  <template #second><div>底部</div></template>
</x-spliter>`;
      return { t, cHori, cVert };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.spliter') }}</h1>
        <p class="text-secondary">可拖拽分隔器，支持水平和垂直方向，拖动中间手柄调整两侧比例。</p>

        <x-waterfall :columns="1" :gap="16">
          <x-demo-block title="水平分屏 Horizontal" :code="cHori">
            <x-spliter :default-size="35" :min="20" :max="80" style="height:200px">
              <template #first>
                <x-picture-box title="左侧面板" height="100%" style="border-radius:0" />
              </template>
              <template #second>
                <x-picture-box title="右侧面板" bg="var(--color-success-soft)" height="100%" style="border-radius:0" />
              </template>
            </x-spliter>
          </x-demo-block>

          <x-demo-block title="垂直分屏 Vertical" :code="cVert">
            <x-spliter direction="vertical" :default-size="40" :min="20" :max="80" style="height:300px">
              <template #first>
                <x-picture-box title="顶部面板" height="100%" style="border-radius:0" />
              </template>
              <template #second>
                <x-picture-box title="底部面板" bg="var(--color-success-soft)" height="100%" style="border-radius:0" />
              </template>
            </x-spliter>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);
