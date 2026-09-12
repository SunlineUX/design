/* ============================================================
 * settings.js - 全局外观设置管理
 *
 *   统一管理五项可切换配置：
 *     1) locale       中英文语言
 *     2) themeColor   主题色彩
 *     3) colorMode    浅色 / 深色 / 跟随系统
 *     4) density      页面宽松度
 *     5) radius       圆角风格
 *
 *   额外暴露：resolvedMode —— 当 colorMode = 'system' 时，
 *   根据系统偏好解析出实际生效的 'light' | 'dark' 值
 *
 *   依赖：Vue 3（需在 settings.js 之前引入）
 * ============================================================ */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'design.settings.v1';

  /* 所有可选项的枚举（也供设置面板渲染） */
  const ENUMS = Object.freeze({
    locale: [
      { value: 'zh-CN', label: '中文' },
      { value: 'en-US', label: 'English' },
    ],
    themeColor: [
      { value: 'indigo', label: 'Indigo', color: '#1369e2' },
      { value: 'emerald', label: 'Emerald', color: '#059669' },
      { value: 'rose', label: 'Rose', color: '#e11d48' },
      { value: 'amber', label: 'Amber', color: '#d97706' },
      { value: 'sky', label: 'Sky', color: '#02a6c7' },
    ],
    colorMode: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' },
    ],
    density: [
      { value: 'compact', label: 'Compact' },
      { value: 'comfortable', label: 'Comfortable' },
      { value: 'loose', label: 'Loose' },
    ],
    radius: [
      { value: 'sharp', label: 'Sharp' },
      { value: 'medium', label: 'Medium' },
      { value: 'round', label: 'Round' },
      { value: 'pill', label: 'Pill' },
    ],
  });

  /* 默认配置 */
  const DEFAULTS = Object.freeze({
    locale: 'zh-CN',
    themeColor: 'indigo',
    colorMode: 'light',   // light | dark | system
    density: 'comfortable',
    radius: 'medium',
  });

  /* 工具：查询系统深浅色偏好 */
  function prefersDark() {
    return global.matchMedia &&
      global.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /* 解析实际生效的颜色模式 */
  function resolveMode(colorMode) {
    if (colorMode === 'system') return prefersDark() ? 'dark' : 'light';
    return colorMode;
  }

  /* 加载本地存储，合并到默认值 */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed };
    } catch (e) {
      console.warn('[settings] load failed:', e);
      return { ...DEFAULTS };
    }
  }

  /* 把设置应用到 <html> 的 data-* 属性上 */
  function apply(state) {
    const root = document.documentElement;
    root.setAttribute('data-theme-color', state.themeColor);
    root.setAttribute('data-theme', resolveMode(state.colorMode));
    root.setAttribute('data-density', state.density);
    root.setAttribute('data-radius', state.radius);
    root.setAttribute('lang', state.locale);
  }

  /* 工厂：创建响应式设置对象（依赖 Vue 3） */
  function create() {
    if (!global.Vue || !global.Vue.reactive) {
      throw new Error('[settings] Vue 3 is required before settings.js');
    }
    const { reactive, watch, computed, ref } = global.Vue;

    const state = reactive(load());

    /* 解析后的实际模式（供 UI 展示与 CSS 应用） */
    const resolvedMode = computed(() => resolveMode(state.colorMode));

    /* 立即应用一次，避免首屏闪烁 */
    apply(state);

    /* 监听任一字段变化 → 写入 DOM + 持久化 */
    const stopWatch = watch(
      () => ({ ...state }),
      (next) => {
        apply(state);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn('[settings] persist failed:', e);
        }
      },
      { deep: true }
    );

    /* 当 colorMode = 'system' 时，实时跟随系统变化 */
    let mql = null;
    let stopSystemWatch = null;
    function bindSystemListener() {
      if (!global.matchMedia) return;
      mql = global.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => { if (state.colorMode === 'system') apply(state); };
      if (mql.addEventListener) mql.addEventListener('change', handler);
      else mql.addListener(handler);
      stopSystemWatch = () => {
        if (mql && mql.removeEventListener) mql.removeEventListener('change', handler);
        else if (mql) mql.removeListener(handler);
      };
    }
    bindSystemListener();

    return {
      state,
      resolvedMode,
      enums: ENUMS,
      defaults: DEFAULTS,

      save() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state }));
          apply(state);
        } catch (e) {
          console.warn('[settings] save failed:', e);
        }
      },

      reset() {
        Object.assign(state, DEFAULTS);
      },

      syncWithSystem() {
        state.colorMode = 'system';
      },

      stopWatch() {
        stopWatch();
        if (stopSystemWatch) stopSystemWatch();
      },
    };
  }

  global.Settings = { create, ENUMS, DEFAULTS, load, apply, prefersDark, resolveMode };
})(window);
