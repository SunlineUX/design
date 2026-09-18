/* ============================================================
 * base/XModal.js — 弹窗（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-modal>
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XModal = {
    props: {
      modelValue: { type: Boolean, default: false },
      title: { type: String, default: '' },
      width: { type: [String, Number], default: 480 },
      closable: { type: Boolean, default: true },
      maskClosable: { type: Boolean, default: true },
    },
    emits: ['update:modelValue', 'close'],
    setup(props, { emit }) {
      const close = () => {
        emit('update:modelValue', false);
        emit('close');
      };
      const onMaskClick = () => { if (props.maskClosable) close(); };
      return { close, onMaskClick };
    },
    template: `
      <teleport to="body">
        <transition name="x-modal">
          <div v-if="modelValue" class="x-modal" @click.self="onMaskClick">
            <div class="x-modal__dialog" :style="{ width: (typeof width === 'number' ? width : parseInt(width) || 480) + 'px' }" @click.stop>
              <div class="x-modal__header">
                <span class="x-modal__title">{{ title }}</span>
                <button v-if="closable" class="x-modal__close" @click="close" aria-label="关闭">×</button>
              </div>
              <div class="x-modal__body"><slot /></div>
              <div v-if="$slots.footer" class="x-modal__footer"><slot name="footer" /></div>
            </div>
          </div>
        </transition>
      </teleport>
    `,
  };
})(window);
