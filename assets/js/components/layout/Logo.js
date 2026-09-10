/* ============================================================
 * layout/Logo.js — 品牌 Logo
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.Logo = {
    template: `
      <div class="logo">
        <span class="logo-mark"></span>
        <span class="logo-text">Datamind</span>
      </div>
    `,
  };
})(window);
