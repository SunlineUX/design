/* ============================================================
 * base/XIcon.js — 基于 iconfont 字体图标（X 前缀基础组件）
 *   name 直接作为 iconfont class（iconfont.css 中的类名即图标名，
 *   如 name="Home" → class="Home"），无需映射表
 *   字体库中没有的图标（sun/moon）回退为 Unicode 字符
 *   自注册到 window.XComponents，模板中使用 <x-icon>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XIcon = {
    props: {
      name: { type: String, required: true },
      size: { type: [String, Number], default: 16 },
    },
    setup(props) {
      const { computed } = global.Vue;
      // iconfont.css 中的类名即图标名，直接使用
      const isFontIcon = computed(() => props.name !== 'sun' && props.name !== 'moon');
      // 字体库暂未提供 sun/moon，用 Unicode 兜底
      const fallback = computed(() => {
        if (props.name === 'sun') return '☀';
        if (props.name === 'moon') return '☾';
        return '';
      });
      return { isFontIcon, fallback };
    },
    template: `
      <i v-if="isFontIcon" class="iconfont" :class="name" :style="{ fontSize: size + 'px' }"></i>
      <span v-else class="icon-fallback" :style="{ fontSize: size + 'px' }">{{ fallback }}</span>
    `,
  };
})(window);
