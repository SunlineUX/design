/* ============================================================
 * views/AboutView.js — 关于页
 *   自注册到 window.ViewComponents，供 routes.js 按 key 引用
 * ============================================================ */
(function (global) {
  'use strict';

  global.ViewComponents = global.ViewComponents || {};

  global.ViewComponents.AboutView = {
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
      <div class="view-about">
        <h1 class="view-title">{{ t('nav.about') }}</h1>
        <div class="card">
          <h3 class="card-title" style="margin-bottom: 16px">NCBS</h3>
          <p class="muted" style="margin-bottom: 16px">
            NCBS · Vue 3 + Composition API + CSS Variables + Vue Router
          </p>
          <ul class="about-list">
            <li v-for="(f, i) in features" :key="i">{{ f }}</li>
          </ul>
        </div>
      </div>
    `,
  };
})(window);
