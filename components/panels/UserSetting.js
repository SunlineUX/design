/* ============================================================
 * panels/UserSetting.js — 个人偏好设置面板
 *   自注册到 window.PanelComponents，模板中使用 <user-setting>
 *
 *   包含：界面语言 / 深浅模式偏好
 *   基本信息表单（姓名/邮箱/手机号/角色）已移至
 *   datamind/pages/UserCenterView.js（个人中心页）
 *   成功提示用绿色 Toast（遵循用户偏好）
 *
 *   用法：
 *     <user-setting :t="t" />
 *   依赖：
 *     - inject('settings')（由 app.provide('settings', settings) 提供）
 *     - <panel-card> <x-radio> <x-button>
 * ============================================================ */
(function (global) {
  'use strict';

  global.PanelComponents = global.PanelComponents || {};

  global.PanelComponents.UserSetting = {
    props: {
      t: { type: Function, required: true },
    },
    setup(props) {
      const { inject, ref, computed } = global.Vue;
      const settings = inject('settings');
      const state = settings.state;
      const enums = settings.enums;

      /* 语言选项 */
      const localeOptions = computed(() => enums.locale.map(o => ({
        value: o.value,
        label: o.label,
      })));
      /* 深浅模式选项（随语言变化） */
      const colorModeOptions = computed(() => [
        { value: 'light', label: props.t('settings.options.light') },
        { value: 'dark', label: props.t('settings.options.dark') },
        { value: 'system', label: props.t('common.system') },
      ]);

      const setField = (field, value) => { state[field] = value; };

      /* Toast 提示 */
      const toast = ref('');
      let toastTimer = null;
      const showToast = (msg) => {
        toast.value = msg;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.value = ''; }, 1800);
      };

      const onSave = () => {
        showToast(props.t('user.savedTip'));
      };

      return { state, enums, localeOptions, colorModeOptions, toast, onSave, setField };
    },
    template: `
      <div class="user-setting">

        <div class="setting-row">
          <div class="setting-row-label">{{ t('settings.sectionLanguage') }}</div>
          <div class="radio-group-vertical">
            <x-radio
              v-for="option in localeOptions"
              :key="option.value"
              name="locale"
              :model-value="state.locale"
              :value="option.value"
              @update:model-value="setField('locale', $event)"
            >{{ option.label }}</x-radio>
          </div>
        </div>
        <!-- 深浅模式 -->
        <div class="setting-row">
          <div class="setting-row-label">{{ t('settings.colorMode') }}</div>
          <div class="radio-group-vertical">
            <x-radio
              v-for="option in colorModeOptions"
              :key="option.value"
              name="color-mode"
              :model-value="state.colorMode"
              :value="option.value"
              @update:model-value="setField('colorMode', $event)"
            >{{ option.label }}</x-radio>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-label">{{ t('settings.themeColor') }}</div>
          <div class="radio-group-vertical">
            <color-picker
              :model-value="state.themeColor"
              :options="enums.themeColor"
              @update:model-value="setField('themeColor', $event)"
            />
          </div>
        </div>
      </div>
    `,
  };
})(window);
