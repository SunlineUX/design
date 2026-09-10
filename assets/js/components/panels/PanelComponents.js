/* ============================================================
 * panels/PanelComponents.js — 业务面板层组件
 *   依赖：base/BaseComponents.js
 *   被 views 层复用
 *
 *   组件嵌套：
 *     PanelCard（通用卡片容器）
 *     ├── ThemeSwitcher
 *     │   └── SegmentedControl (颜色模式)
 *     └── LanguagePanel
 *         ├── SegmentedControl (语言)
 *         └── BaseButton
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = {

    /* ---------- PanelCard：通用卡片容器 ---------- */
    PanelCard: {
      props: {
        title: { type: String, default: '' },
        elevated: { type: Boolean, default: false },
      },
      template: `
        <div :class="['card', elevated && 'card-elevated', 'panel-card']">
          <div v-if="title" class="panel-card-title">{{ title }}</div>
          <div class="panel-card-body"><slot /></div>
        </div>
      `,
    },

    /* ---------- ThemeSwitcher：主题切换面板 ---------- */
    ThemeSwitcher: {
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
            <segmented-control
              :model-value="modelValue"
              :options="options"
              @update:model-value="$emit('update:modelValue', $event)"
            />
          </div>
          <div class="panel-debug">
            <span class="debug-key">mode:</span>
            <badge variant="primary">{{ modelValue }}</badge>
            <span class="debug-sep">·</span>
            <span class="debug-key">resolved:</span>
            <badge variant="primary">{{ resolvedMode }}</badge>
          </div>
        </panel-card>
      `,
    },

    /* ---------- LanguagePanel：语言切换面板 ---------- */
    LanguagePanel: {
      props: {
        locale: { type: String, default: 'zh-CN' },
        t: { type: Function, required: true },
      },
      emits: ['update:locale', 'toggle-sidebar'],
      template: `
        <panel-card :title="t('settings.language')">
          <div class="panel-row">
            <div class="panel-row-label">
              <span class="panel-row-title">locale:</span>
            </div>
            <badge variant="primary">{{ locale }}</badge>
          </div>
          <div style="margin-top: 12px">
            <base-button variant="primary" size="sm" @click="$emit('toggle-sidebar')">
              {{ t('common.toggleSidebar') }}
            </base-button>
          </div>
        </panel-card>
      `,
    },

    /* ---------- ColorPicker：主题色色板选择 ---------- */
    ColorPicker: {
      props: {
        modelValue: { type: String, required: true },
        options: { type: Array, required: true }, // [{value, label, color}]
      },
      emits: ['update:modelValue'],
      template: `
        <div class="swatches">
          <span
            v-for="opt in options"
            :key="opt.value"
            class="swatch"
            :class="{ active: modelValue === opt.value }"
            :style="{ background: opt.color }"
            :title="opt.label"
            @click="$emit('update:modelValue', opt.value)"
          />
        </div>
      `,
    },
  };
})(window);
