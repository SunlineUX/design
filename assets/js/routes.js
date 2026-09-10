/* ============================================================
 * routes.js — 路由表 + 菜单源数据
 *
 *   单一数据源：menuRoutes 同时驱动侧边栏菜单和路由配置
 *   每条记录：
 *     { key, path, label, icon?, children? }
 *
 *   path 必须是绝对路径（以 / 开头），子菜单通过 children 嵌套
 * ============================================================ */
(function (global) {
  'use strict';

  /* ---------- 菜单 + 路由：单一数据源 ---------- */
  const menuRoutes = [
    { key: 'home',   path: '/home',         label: 'nav.home',    icon: 'home',    component: 'home-view' },
    { key: 'about',  path: '/about',        label: 'nav.about',   icon: 'about',   component: 'about-view' },
    {
      key: 'system',
      path: '/system',
      label: 'nav.system',
      icon: 'system',
      children: [
        { key: 'system-users', path: '/system/users', label: 'nav.systemUsers', icon: 'user',     component: 'system-users-view' },
        { key: 'system-roles', path: '/system/roles', label: 'nav.systemRoles', icon: 'settings', component: 'system-roles-view' },
      ],
    },
  ];

  /* ---------- 把 menuRoutes 转为 Vue Router routes ---------- */
  function toRoutes(items) {
    return items.map(item => {
      const route = {
        path: item.path,
        name: item.key,
        component: () => {
          const C = global.ViewComponents && global.ViewComponents[item.component]
            ? global.ViewComponents[item.component]
            : { template: '<div style="padding:40px;color:var(--text-tertiary)"><h2>页面建设中</h2></div>' };
          return C;
        },
        meta: { title: item.label, key: item.key },
      };
      if (item.children && item.children.length) {
        route.redirect = item.children[0].path;
      }
      return route;
    });
  }

  /* ---------- 完整路由表 ---------- */
  function buildRoutes() {
    const routes = [];
    // 根路径重定向
    routes.push({ path: '/', redirect: '/home' });
    // 业务路由
    routes.push(...toRoutes(menuRoutes));
    // 404
    routes.push({
      path: '/:pathMatch(.*)*',
      component: { template: '<div style="padding:80px;text-align:center;color:var(--text-tertiary)"><h2>404</h2><p>页面不存在</p></div>' },
    });
    return routes;
  }

  global.Routes = { menuRoutes, buildRoutes };
})(window);
