/* ============================================================
 * panels/ThemeSwitcher.js — 主题切换面板
 *   自注册到 window.PanelComponents，模板中使用 <theme-switcher>
 *
 *   用法：
 *     <theme-switcher
 *       v-model="state.colorMode"
 *       :resolved-mode="resolvedMode"
 *       :t="t"
 *     />
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = global.PanelComponents || {};

  global.PanelComponents.ThemeSwitcher = {
    props: {
      modelValue: { type: String, default: 'light' }, // light | dark | system
      resolvedMode: { type: String, default: 'light' }, // 实际生效模式
      t: { type: Function, required: true },
    },
    emits: ['update:modelValue'],
    setup(props) {
      const { computed } = global.Vue;
      const options = computed(() => [
        { value: 'light', label: props.t('settings.options.light') },
        { value: 'dark', label: props.t('settings.options.dark') },
        { value: 'system', label: props.t('common.system') },
      ]);
      return { options };
    },
    template: `
      <panel-card :title="t('settings.themeColor') + ' / ' + t('settings.colorMode')">
        <div class="panel-row">
          <div class="panel-row-label">
            <span class="panel-row-title">{{ t('settings.colorModeDesc') }}</span>
          </div>
          <x-segmented-control
            :model-value="modelValue"
            :options="options"
            @update:model-value="$emit('update:modelValue', $event)"
          />
        </div>
        <div class="panel-debug">
          <span class="debug-key">mode:</span>
          <x-badge variant="primary">{{ modelValue }}</x-badge>
          <span class="debug-sep">·</span>
          <span class="debug-key">resolved:</span>
          <x-badge variant="primary">{{ resolvedMode }}</x-badge>
        </div>
      </panel-card>
    `,
  };
})(window);
