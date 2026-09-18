/* ============================================================
 * base/XAlert.js — 警告提示横幅（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-alert>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XAlert = {
    props: {
      type: { type: String, default: 'info' }, // info | success | warning | error
      title: { type: String, default: '' },
      closable: { type: Boolean, default: false },
      showIcon: { type: Boolean, default: true },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const { ref } = global.Vue;
      const visible = ref(true);
      const close = () => { visible.value = false; emit('close'); };
      const iconMap = { info: 'RemindFilled', success: 'Choose', warning: 'ClockAlarmFilled', error: 'CircleRemoveFilled' };
      return { visible, close, iconMap };
    },
    template: `
      <transition name="x-alert">
        <div v-if="visible" class="x-alert" :class="'x-alert--' + type">
          <x-icon v-if="showIcon" :name="iconMap[type] || iconMap.info" :size="16" />
          <div class="x-alert__content">
            <div v-if="title" class="x-alert__title">{{ title }}</div>
            <div class="x-alert__desc"><slot /></div>
          </div>
          <button v-if="closable" class="x-alert__close" @click="close" aria-label="关闭">×</button>
        </div>
      </transition>
    `,
  };
})(window);
