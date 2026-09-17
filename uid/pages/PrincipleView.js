/* ============================================================
 * views/AboutView.js — 关于页
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.PrincipleView = {
    setup() {
      const { inject } = global.Vue;
      const t = inject('t');
      const features = [
        t('about.routing'),
        t('about.state'),
        t('about.components'),
        t('about.layout'),
        t('about.theme'),
        t('about.i18n'),
      ];
      return { t, features };
    },
    template: `
      <div class="view-page">
        <h1 class="view-title">{{ t('nav.principle') }}</h1>
        <div class="card">
          <h3 class="card-title" style="margin-bottom: 16px">基于统一的NCBS设计要求</h3>
          
        </div>
      </div>
    `,
  };
})(window);
