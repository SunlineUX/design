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
      return { t };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.spliter') }}</h1>
        <p class="text-secondary">可拖拽分隔器，支持水平和垂直方向，拖动中间手柄调整两侧比例。</p>

        <panel-card title="水平分屏 Horizontal">
          <x-spliter :default-size="35" :min="20" :max="80">
            <template #first>
              <x-picture-box title="左侧面板" height="100%" style="border-radius:0" />
            </template>
            <template #second>
              <x-picture-box title="右侧面板" bg="var(--color-success-soft)" height="100%" style="border-radius:0" />
            </template>
          </x-spliter>
        </panel-card>

        <panel-card title="垂直分屏 Vertical">
          <x-spliter direction="vertical" :default-size="40" :min="20" :max="80" style="height:400px">
            <template #first>
              <x-picture-box title="顶部面板" height="100%" style="border-radius:0" />
            </template>
            <template #second>
              <x-picture-box title="底部面板" bg="var(--color-success-soft)" height="100%" style="border-radius:0" />
            </template>
          </x-spliter>
        </panel-card>
      </div>
    `,
  };
})(window);
