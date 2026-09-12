/* ============================================================
 * layout/Logo.js — 品牌 Logo
 *   通过 props 传入图片路径与名称，由 <app-layout :logo="..."> 统一配置
 *   自注册到 window.LayoutComponents
 *
 *   用法：
 *     <logo :src="'../assets/logo.svg'" :name="'Datamind'" />
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  global.LayoutComponents.Logo = {
    props: {
      logo: { type: String, default: '' },
      name: { type: String, default: '' },
    },
    template: `
      <div class="logo">
        <span v-if="logo" class="logo-mark">
          <img :src="logo" :alt="name" />
        </span>
        <span v-if="name" class="logo-text">{{ name }}</span>
      </div>
    `,
  };
})(window);
