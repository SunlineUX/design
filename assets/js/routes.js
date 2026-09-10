/* ============================================================
 * routes.js — 菜单/路由构建工具
 *
 *   各入口 HTML（demo.html / ai.html ...）在本页内定义自己的
 *   menuRoutes 菜单配置，然后调用：
 *     window.Routes.buildRoutes(menuRoutes)
 *   生成 Vue Router 路由表。
 *
 *   menuRoutes 约定：
 *     - 所有 path 都是【绝对路径】（方便菜单点击 router.push 和 active 判断）
 *     - componentKey 对应 views/ 中自注册到 window.ViewComponents 的组件名
 *
 *   buildRoutes 转换规则：
 *     - 有 children 的项 → 嵌套路由（子项 path 自动转为相对）
 *     - 父路由自动 redirect 到第一个子项
 *     - 根路径 / 自动 redirect 到第一项
 *     - 自动追加 404 通配路由
 *
 *   Vue Router 4 嵌套规则：
 *     - 父路由 path: '/system'（绝对）
 *     - 子路由 path: 'users'（相对，不需要 / 开头）
 *     - 最终匹配: '/system/users'
 *     - route.matched 包含 [system, users] → breadcrumb 自动正确
 * ============================================================ */
(function (global) {
  'use strict';

  /* ---------- 把绝对路径转为相对父路径 ---------- */
  function toChildPath(parentPath, childAbsPath) {
    const prefix = parentPath + '/';
    if (childAbsPath.startsWith(prefix)) {
      return childAbsPath.substring(prefix.length);
    }
    return childAbsPath; // fallback
  }

  /* ---------- 构建 Vue Router route 对象 ---------- */
  function buildRoute(item) {
    const route = {
      path: item.path,
      name: item.key,
      meta: { title: item.label, key: item.key },
    };

    if (item.children && item.children.length) {
      // 嵌套路由
      route.redirect = item.path + '/' + toChildPath(item.path, item.children[0].path);
      route.children = item.children.map(child => ({
        path: toChildPath(item.path, child.path),
        name: child.key,
        meta: { title: child.label, key: child.key },
        component:
          (global.ViewComponents && global.ViewComponents[child.componentKey])
          || { template: '<div style="padding:40px;color:var(--text-tertiary)"><h2>页面建设中</h2></div>' },
      }));
    } else if (item.componentKey) {
      // 叶子路由
      route.component =
        (global.ViewComponents && global.ViewComponents[item.componentKey])
        || { template: '<div style="padding:40px;color:var(--text-tertiary)"><h2>页面建设中</h2></div>' };
    }

    return route;
  }

  /* ---------- 由一套菜单配置生成完整路由表 ---------- */
  function buildRoutes(menuRoutes) {
    const routes = [];
    routes.push({ path: '/', redirect: menuRoutes[0].path });
    routes.push(...menuRoutes.map(buildRoute));
    routes.push({
      path: '/:pathMatch(.*)*',
      component: { template: '<div style="padding:80px;text-align:center;color:var(--text-tertiary)"><h2>404</h2><p>页面不存在</p></div>' },
    });
    return routes;
  }

  global.Routes = { buildRoutes };
})(window);
