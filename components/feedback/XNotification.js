/* ============================================================
 * base/XNotification.js — 通知（命令式，右上角滑入）
 *   用法：window.XNotification.open({ title, message, type })
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  function open(options) {
    const opt = typeof options === 'string' ? { message: options } : options;
    const type = ['info', 'success', 'warning', 'error'].includes(opt.type) ? opt.type : 'info';
    const duration = opt.duration ?? 4500;

    const el = document.createElement('div');
    el.className = 'x-notification x-notification--' + type;
    el.innerHTML =
      '<div class="x-notification__title">' + (opt.title || '通知') + '</div>' +
      '<div class="x-notification__message">' + (opt.message || '') + '</div>';
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('x-notification--show'));

    const close = () => {
      el.classList.remove('x-notification--show');
      setTimeout(() => el.remove(), 300);
    };
    if (duration > 0) setTimeout(close, duration);
    return { close };
  }

  const api = {
    open,
    success: (o) => open(typeof o === 'string' ? { message: o, type: 'success', title: '成功' } : { ...o, type: 'success' }),
    error: (o) => open(typeof o === 'string' ? { message: o, type: 'error', title: '错误' } : { ...o, type: 'error' }),
    warning: (o) => open(typeof o === 'string' ? { message: o, type: 'warning', title: '警告' } : { ...o, type: 'warning' }),
    info: (o) => open(typeof o === 'string' ? { message: o, type: 'info', title: '提示' } : { ...o, type: 'info' }),
  };
  global.XNotification = api;

  global.XComponents.XNotification = {
    template: `<div></div>`,
  };
})(window);
