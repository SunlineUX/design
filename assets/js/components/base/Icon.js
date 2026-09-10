/* ============================================================
 * base/Icon.js — 基于 iconfont 字体图标
 *   通过 name → Dm- 前缀 class 映射查找 iconfont.css 中的图标
 *   未在字体库中找到的图标（sun/moon）回退为 Unicode 字符
 *   自注册到 window.BaseComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.BaseComponents = global.BaseComponents || {};

  global.BaseComponents.Icon = {
    props: {
      name: { type: String, required: true },
      size: { type: [String, Number], default: 16 },
    },
    setup(props) {
      // 名称 → iconfont class（Dm- 前缀）
      const MAP = {
        home:     'Dm-Home',
        about:    'Dm-Compass',
        menu:     'Dm-Hamburger',
        chevronLeft:  'Dm-ArrowLeft',
        chevronRight: 'Dm-ArrowRight',
        chevronDown:  'Dm-ArrowDown',
        globe:    'Dm-BandCard',
        settings: 'Dm-Setting',
        user:     'Dm-UserInfo',
        system:   'Dm-Cpu',
      };
      const cls = MAP[props.name];
      const isFontIcon = !!cls;
      const fallback = (!isFontIcon && props.name === 'sun') ? '☀'
                      : (!isFontIcon && props.name === 'moon') ? '☾'
                      : '';
      return { cls, isFontIcon, fallback };
    },
    template: `
      <i v-if="isFontIcon" class="iconfont" :class="cls" :style="{ fontSize: size + 'px' }"></i>
      <span v-else class="icon-fallback" :style="{ fontSize: size + 'px' }">{{ fallback }}</span>
    `,
  };
})(window);
