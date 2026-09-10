/* ============================================================
 * app.js - Vue 应用入口
 *   依赖：Vue 3 (CDN) / i18n.js / settings.js
 *   整合：语言切换、主题色、深浅模式、页面宽松度、圆角风格
 * ============================================================ */
(function () {
  'use strict';

  const { createApp, computed, ref } = window.Vue;

  const app = createApp({
    setup() {
      const settings = window.Settings.create();
      const state = settings.state;

      /* 取当前语言文案：t('hero.title') 等 */
      const dict = computed(() => window.I18N[state.locale] || window.I18N['zh-CN']);
      const t = (key) => {
        return key.split('.').reduce((acc, k) => (acc ? acc[k] : ''), dict.value);
      };

      /* 当前激活 tab：home / gallery / settings */
      const activeTab = ref('home');
      const switchTab = (name) => { activeTab.value = name; };

      /* 首页概览卡片：对应五大切换能力，随语言变化 */
      const homeCards = computed(() => {
        const d = dict.value;
        return [
          { title: d.settings.language, tag: 'i18n', desc: d.settings.languageDesc },
          { title: d.settings.themeColor, tag: 'color', desc: d.settings.themeColorDesc },
          { title: d.settings.colorMode, tag: 'mode', desc: d.settings.colorModeDesc },
          { title: d.settings.density, tag: 'space', desc: d.settings.densityDesc },
          { title: d.settings.radius, tag: 'radius', desc: d.settings.radiusDesc },
        ];
      });

      /* Toast 提示（成功提示用绿色，遵循用户偏好） */
      const toast = ref('');
      let toastTimer = null;
      const showToast = (msg) => {
        toast.value = msg;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.value = ''; }, 1800);
      };

      /* 事件处理 */
      const onSave = () => {
        settings.save();
        showToast(t('settings.savedTip'));
      };
      const onReset = () => {
        settings.reset();
        showToast(t('settings.resetTip'));
      };

      /* 设置项切换的通用方法（用于分段选择器） */
      const setField = (field, value) => { state[field] = value; };

      return {
        state,
        enums: settings.enums,
        t,
        activeTab,
        switchTab,
        homeCards,
        toast,
        onSave,
        onReset,
        setField,
      };
    },
  });

  app.mount('#app');
})();
