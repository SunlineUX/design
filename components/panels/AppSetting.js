/* ============================================================
 * panels/AppSetting.js — 应用外观设置面板
 *   自注册到 window.PanelComponents，模板中使用 <app-setting>
 *
 *   整合五大外观配置：主题色 / 深浅模式 / 页面宽松度 / 圆角风格
 *   通过 inject('settings') 获取响应式状态，Save/Reset 调用其方法
 *   成功提示用绿色 Toast（遵循用户偏好）
 *
 *   用法：
 *     <app-setting :t="t" />
 *   依赖：
 *     - inject('settings')（由 app.provide('settings', settings) 提供）
 *     - <panel-card> <color-picker> <x-segmented-control> <x-button> <x-badge>
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = global.PanelComponents || {};

  global.PanelComponents.AppSetting = {
    props: {
      t: { type: Function, required: true },
    },
    setup(props) {
      const { inject, ref, computed } = global.Vue;
      const settings = inject('settings');
      const state = settings.state;
      const enums = settings.enums;
      const resolvedMode = settings.resolvedMode;

      /* 各分段选择器的选项（随语言变化） */
      const colorModeOptions = computed(() => [
        { value: 'light', label: props.t('settings.options.light') },
        { value: 'dark', label: props.t('settings.options.dark') },
        { value: 'system', label: props.t('common.system') },
      ]);
      const densityOptions = computed(() => enums.density.map(o => ({
        value: o.value,
        label: props.t('settings.options.' + o.value),
      })));
      const radiusOptions = computed(() => enums.radius.map(o => ({
        value: o.value,
        label: props.t('settings.options.' + o.value),
      })));

      /* Toast 提示（成功提示用绿色） */
      const toast = ref('');
      let toastTimer = null;
      const showToast = (msg) => {
        toast.value = msg;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.value = ''; }, 1800);
      };

      const onSave = () => {
        settings.save();
        showToast(props.t('settings.savedTip'));
      };
      const onReset = () => {
        settings.reset();
        showToast(props.t('settings.resetTip'));
      };

      /* 设置项切换 */
      const setField = (field, value) => { state[field] = value; };

      return {
        state,
        enums,
        resolvedMode,
        colorModeOptions,
        densityOptions,
        radiusOptions,
        toast,
        onSave,
        onReset,
        setField,
      };
    },
    template: `
      <div class="app-setting">
        <panel-card :title="t('settings.sectionAppearance')">
          <!-- 主题色 -->
          <div class="panel-row">
            <div class="panel-row-label">
              <span class="panel-row-title">{{ t('settings.themeColor') }}</span>
              <span class="panel-row-desc">{{ t('settings.themeColorDesc') }}</span>
            </div>
            <color-picker
              :model-value="state.themeColor"
              :options="enums.themeColor"
              @update:model-value="setField('themeColor', $event)"
            />
          </div>

          <!-- 深浅模式 -->
          <div class="panel-row">
            <div class="panel-row-label">
              <span class="panel-row-title">{{ t('settings.colorMode') }}</span>
              <span class="panel-row-desc">{{ t('settings.colorModeDesc') }}</span>
            </div>
            <x-segmented-control
              :model-value="state.colorMode"
              :options="colorModeOptions"
              @update:model-value="setField('colorMode', $event)"
            />
          </div>

          <!-- 页面宽松度 -->
          <div class="panel-row">
            <div class="panel-row-label">
              <span class="panel-row-title">{{ t('settings.density') }}</span>
              <span class="panel-row-desc">{{ t('settings.densityDesc') }}</span>
            </div>
            <x-segmented-control
              :model-value="state.density"
              :options="densityOptions"
              @update:model-value="setField('density', $event)"
            />
          </div>

          <!-- 圆角风格 -->
          <div class="panel-row">
            <div class="panel-row-label">
              <span class="panel-row-title">{{ t('settings.radius') }}</span>
              <span class="panel-row-desc">{{ t('settings.radiusDesc') }}</span>
            </div>
            <x-segmented-control
              :model-value="state.radius"
              :options="radiusOptions"
              @update:model-value="setField('radius', $event)"
            />
          </div>

          <!-- 调试信息 -->
          <div class="panel-debug">
            <span class="debug-key">themeColor:</span>
            <x-badge variant="primary">{{ state.themeColor }}</x-badge>
            <span class="debug-sep">·</span>
            <span class="debug-key">mode:</span>
            <x-badge variant="primary">{{ state.colorMode }}</x-badge>
            <span class="debug-sep">·</span>
            <span class="debug-key">resolved:</span>
            <x-badge variant="primary">{{ resolvedMode }}</x-badge>
          </div>
        </panel-card>

        <!-- 操作按钮 -->
        <div class="panel-actions">
          <x-button variant="primary" @click="onSave">{{ t('settings.save') }}</x-button>
          <x-button variant="ghost" @click="onReset">{{ t('settings.reset') }}</x-button>
        </div>

        <!-- Toast 成功提示 -->
        <transition name="toast">
          <div v-if="toast" class="toast">{{ toast }}</div>
        </transition>
      </div>
    `,
  };
})(window);
