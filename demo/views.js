/* ============================================================
 * datamind/views.js — datamind 项目专属视图配置（清单 + 加载器）
 *
 *   只被 datamind/index.html 引入，不与其他项目共用：
 *     <script src="./views.js"></script>
 *
 *   新增 datamind 项目的页面：
 *     1. 在 ./pages/ 下新建 XxxView.js（自注册到 window.ViewComponents）
 *     2. 在下方 VIEWS 清单里加一行
 *     3. 在 index.html 的 menuRoutes 里配置路由
 * ============================================================ */
(function () {
  'use strict';

  const HERE = new URL('./', document.currentScript.src).href;  // .../datamind/

  /* ---------- 缓存版本号：修改页面视图后刷新不生效时，把版本号 +1 ---------- */
  const VER = '3';

  /* ---------- 本项目视图清单：新增页面在这里加一行 ---------- */
  const VIEWS = [
    'pages/HomeView.js',
    'pages/AboutView.js',
    'pages/SystemUsersView.js',
    'pages/SystemRolesView.js',
    'pages/UserCenterView.js',
    './AppSettingView.js',
  ];

  /* ---------- 同步按序加载（须在 HTML 解析期间执行） ---------- */
  const write = src => document.write('<script src="' + src + '?v=' + VER + '"><\/script>');
  VIEWS.forEach(f => write(HERE + f));
})();
