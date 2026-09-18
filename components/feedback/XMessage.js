/* ============================================================
 * base/XMessage.js — 全局消息提示（命令式）
 *   用法：window.XMessage.success('操作成功')
 *   也支持 <x-message> 组件形式（受控）
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  // ---------- 命令式 API ----------
  const types = ['info', 'success', 'warning', 'error'];
  function Message(options) {
    const opt = typeof options === 'string' ? { content: options } : options;
    const type = types.includes(opt.type) ? opt.type : 'info';
    const duration = opt.duration ?? 2500;

    const el = document.createElement('div');
    el.className = 'x-message x-message--' + type;
    el.innerHTML = '<span class="x-message__content">' + (opt.content || '') + '</span>';
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('x-message--show'));

    let timer = null;
    const close = () => {
      clearTimeout(timer);
      el.classList.remove('x-message--show');
      setTimeout(() => el.remove(), 300);
    };
    if (duration > 0) timer = setTimeout(close, duration);
    return { close };
  }

  const api = {
    show: Message,
    info: (c, d) => Message({ content: c, type: 'info', duration: d }),
    success: (c, d) => Message({ content: c, type: 'success', duration: d }),
    warning: (c, d) => Message({ content: c, type: 'warning', duration: d }),
    error: (c, d) => Message({ content: c, type: 'error', duration: d }),
  };
  global.XMessage = api;

  // ---------- 组件形式（可选） ----------
  global.XComponents.XMessage = {
    props: {
      type: { type: String, default: 'info' },
      content: { type: String, default: '' },
      duration: { type: Number, default: 2500 },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const { ref, onMounted, onUnmounted } = global.Vue;
      const visible = ref(false);
      let timer = null;
      onMounted(() => {
        requestAnimationFrame(() => (visible.value = true));
        if (props.duration > 0) timer = setTimeout(() => { visible.value = false; setTimeout(() => emit('close'), 300); }, props.duration);
      });
      onUnmounted(() => clearTimeout(timer));
      return { visible };
    },
    template: `
      <transition name="x-message">
        <div v-if="visible" class="x-message" :class="'x-message--' + type">
          <span class="x-message__content"><slot>{{ content }}</slot></span>
        </div>
      </transition>
    `,
  };
})(window);
