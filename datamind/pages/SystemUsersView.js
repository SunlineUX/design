/* ============================================================
 * views/SystemUsersView.js — 系统管理 / 用户管理
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SystemUsersView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      return { t };
    },
    template: `
      <div class="view-system">
        <h1 class="view-title">{{ t('nav.systemUsers') }}</h1>
        <div class="card">
          <h3 class="card-title">用户列表</h3>
          <p class="muted">此处为用户管理页面，可集成表格、搜索、分页等功能。</p>
        </div>
      </div>
    `,
  };
})(window);
