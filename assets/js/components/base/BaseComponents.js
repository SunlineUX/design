/* ============================================================
 * base/BaseComponents.js — 基础 UI 组件
 *   最底层，只依赖 CSS 变量（不依赖任何业务组件）
 *   图标使用 assets/font/iconfont.css 字体图标（Dm- 前缀）
 *   导出：Icon, BaseButton, SegmentedControl, Badge
 *   注册：Vue.app.component() 全局注册
 * ============================================================ */
(function (global) {
  'use strict';

  global.BaseComponents = {

    /* ---------- Icon：基于 iconfont 字体图标 ----------
     *   通过 name → Dm- 前缀 class 映射查找 iconfont.css 中的图标
     *   未在字体库中找到的图标（sun/moon）回退为 Unicode 字符
     */
    Icon: {
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
    },

    /* ---------- BaseButton：在 .btn 基础上封装 ---------- */
    BaseButton: {
      props: {
        variant: { type: String, default: 'default' }, // default | primary | ghost
        size: { type: String, default: 'md' },         // sm | md
        disabled: { type: Boolean, default: false },
      },
      template: `
        <button
          :class="[
            'btn',
            variant === 'primary' && 'btn-primary',
            variant === 'ghost' && 'btn-ghost',
            size === 'sm' && 'btn-sm'
          ]"
          :disabled="disabled"
          @click="$emit('click', $event)"
        >
          <slot />
        </button>
      `,
    },

    /* ---------- SegmentedControl：分段选择器 ---------- */
    SegmentedControl: {
      props: {
        modelValue: { type: [String, Number], required: true },
        options: { type: Array, required: true }, // [{value, label}]
      },
      emits: ['update:modelValue'],
      template: `
        <div class="segmented">
          <button
            v-for="opt in options"
            :key="opt.value"
            :class="{ active: modelValue === opt.value }"
            @click="$emit('update:modelValue', opt.value)"
          >{{ opt.label }}</button>
        </div>
      `,
    },

    /* ---------- Badge / Chip ---------- */
    Badge: {
      props: {
        variant: { type: String, default: 'default' }, // default | primary | success
      },
      template: `
        <span :class="[
          'chip',
          variant === 'primary' && 'chip-primary',
          variant === 'success' && 'chip-success',
        ]"><slot /></span>
      `,
    },
  };
})(window);
