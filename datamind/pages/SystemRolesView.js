/* ============================================================
 * views/SystemRolesView.js — 系统管理 / 角色管理
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.SystemRolesView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      return { t };
    },
    template: `
      <div class="view-system">
        <h1 class="view-title">{{ t('nav.systemRoles') }}</h1>
        <div class="card">
          <h3 class="card-title">角色列表</h3>
          <p class="muted">此处为角色管理页面，可集成权限分配、角色编辑等功能。</p>
        </div>
      </div>
    `,
  };
})(window);
