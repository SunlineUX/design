/* ============================================================
 * FlexboxView.js — 弹性布局展示（结合 XSpliter 演示响应式等分）
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.FlexboxView = {
    setup() {
      const { inject, ref, computed } = global.Vue;
      const t = inject('t');

      const mode = ref('auto'); // auto | fixed
      const cols = ref(3);
      const gap = ref(12);
      const gapOptions = [8, 12, 16, 24, 32];
      const colOptions = [1, 2, 3, 4, 5, 6];

      // 演示用的子元素数量
      const items = computed(() => Array.from({ length: 8 }, (_, i) => ({
        index: i + 1,
        bg: [
          'var(--color-primary-soft)',
          'var(--color-success-soft)',
          'var(--color-warning-soft)',
          'var(--color-danger-soft)',
        ][i % 4],
      })));

      return { t, mode, cols, gap, gapOptions, colOptions, items };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.flexbox') }}</h1>
        <p class="text-secondary">响应式等分布局容器。拖动下方分隔条改变右侧宽度，观察列数自动变化。</p>

        <panel-card title="拖拽演示 Drag to resize">
          <x-spliter :default-size="30" :min="10" :max="50" style="height:340px;border:1px solid var(--border-color);border-radius:var(--radius-md);overflow:hidden">
            <!-- 左侧：控制面板 -->
            <template #first>
              <div style="padding:16px;display:flex;flex-direction:column;gap:16px;background:var(--bg-surface);height:100%;overflow:auto">
                <div>
                  <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:6px">布局模式</div>
                  <x-segmented-control
                    v-model="mode"
                    :options="[{value:'auto',label:'响应式'},{value:'fixed',label:'固定列数'}]"
                  />
                </div>

                <div v-if="mode === 'fixed'">
                  <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:6px">列数 {{ cols }}</div>
                  <input type="range" min="1" max="6" v-model.number="cols" style="width:100%" />
                </div>

                <div>
                  <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:6px">间距 {{ gap }}px</div>
                  <input type="range" min="4" max="40" v-model.number="gap" style="width:100%" />
                </div>

                <x-divider size="sm" />

                <div style="font-size:12px;color:var(--text-tertiary);line-height:1.6">
                  <div v-if="mode === 'auto'">响应式断点：</div>
                  <div v-if="mode === 'auto'">≥1600px → 4 列</div>
                  <div v-if="mode === 'auto'">≥1200px → 3 列</div>
                  <div v-if="mode === 'auto'">≥800px → 2 列</div>
                  <div v-if="mode === 'auto'">&lt;800px → 1 列</div>
                  <div v-else>固定 {{ cols }} 列等分</div>
                </div>

                <div style="margin-top:auto;padding-top:12px;border-top:1px solid var(--border-color);font-size:12px;color:var(--text-secondary)">
                  拖动中间手柄 →
                </div>
              </div>
            </template>

            <!-- 右侧：Flexbox 演示区 -->
            <template #second>
              <div style="padding:12px;height:100%;background:var(--bg-surface-2);overflow:auto">
                <x-flexbox
                  :cols="mode === 'fixed' ? cols : 0"
                  :gap="gap"
                  style="min-height:100%"
                >
                  <div
                    v-for="item in items"
                    :key="item.index"
                    class="x-picture-box"
                    :style="{ background: item.bg }"
                  >
                    {{ item.index }}
                  </div>
                </x-flexbox>
              </div>
            </template>
          </x-spliter>
        </panel-card>

        <panel-card title="固定列数示例 Fixed columns">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div v-for="c in [2, 3, 4]" :key="c">
              <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:6px">{{ c }} 列</div>
              <x-flexbox :cols="c" :gap="12">
                <div v-for="i in c" :key="i" class="x-picture-box" :style="{ background: 'var(--color-primary-soft)' }">{{ i }}</div>
              </x-flexbox>
            </div>
          </div>
        </panel-card>
      </div>
    `,
  };
})(window);
