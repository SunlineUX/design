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
      const { computed } = global.Vue;
      // 名称 → iconfont class（Dm- 前缀）
      const MAP = {
        home:     'Dm-Home',
        about:    'Dm-Compass',
        menu:     'Dm-Hamburger',
        chevronLeft:  'Dm-ArrowLeft',
        chevronRight: 'Dm-ArrowRight',
        chevronDown:  'Dm-ArrowDown',
        sidebarLeftExpand:   'Dm-SidebarLeftExpand',
        sidebarLeftCollapse: 'Dm-SidebarLeftCollapse',
        globe:    'Dm-BandCard',
        settings: 'Dm-Setting',
        user:     'Dm-UserInfo',
        system:   'Dm-Cpu',
      };
      // 必须用 computed：name prop 会动态变化（如折叠按钮 chevronLeft↔chevronRight），
      // setup 只执行一次，普通常量不会随 prop 更新
      const cls = computed(() => MAP[props.name] || '');
      const isFontIcon = computed(() => !!cls.value);
      const fallback = computed(() => {
        if (isFontIcon.value) return '';
        if (props.name === 'sun') return '☀';
        if (props.name === 'moon') return '☾';
        return '';
      });
      return { cls, isFontIcon, fallback };
    },
    template: `
      <i v-if="isFontIcon" class="iconfont" :class="cls" :style="{ fontSize: size + 'px' }"></i>
      <span v-else class="icon-fallback" :style="{ fontSize: size + 'px' }">{{ fallback }}</span>
    `,
  };
})(window);
