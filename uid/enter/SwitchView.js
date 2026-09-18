/* ============================================================
 * SwitchView.js — 开关展示
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SwitchView = {
    setup() {
      const { inject, ref } = global.Vue;
      const t = inject('t');
      const s1 = ref(false);
      const s2 = ref(true);
      const s3 = ref(true);
      const cSwitch = `<x-switch v-model="s1" />
<x-switch v-model="s2" />`;
      const cSize = `<x-switch :model-value="true" size="sm" />
<x-switch :model-value="true" size="md" />
<x-switch :model-value="true" size="lg" />`;
      return { t, s1, s2, s3, cSwitch, cSize };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.switch') }}</h1>
        <p class="text-secondary">开关组件，用于在两个状态间切换。</p>

        <x-waterfall :columns="2" :gap="16">
          <x-demo-block title="基础开关" :code="cSwitch">
            <div style="display:flex;flex-direction:column;gap:20px">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span>消息通知</span>
                <x-switch v-model="s1" />
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span>深色模式</span>
                <x-switch v-model="s2" />
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span>自动保存</span>
                <x-switch v-model="s3" disabled />
              </div>
            </div>
          </x-demo-block>

          <x-demo-block title="尺寸 Size" :code="cSize">
            <x-space size="lg" align="center">
              <x-switch :model-value="true" size="sm" />
              <x-switch :model-value="true" size="md" />
              <x-switch :model-value="true" size="lg" />
            </x-space>
          </x-demo-block>
        </x-waterfall>
      </div>
    `,
  };
})(window);