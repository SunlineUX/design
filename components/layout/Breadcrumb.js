/* ============================================================
 * layout/Breadcrumb.js — 面包屑
 *   从 route.matched 自动生成，用 t() 翻译 meta.title
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  const { useRoute } = global.VueRouter;

  global.LayoutComponents.Breadcrumb = {
    props: { t: { type: Function, required: true } },
    setup(props) {
      const { computed } = global.Vue;
      const route = useRoute();
      const items = computed(() => {
        return route.matched
          .filter(r => r.meta && r.meta.title)
          .map(r => ({ label: props.t(r.meta.title), path: r.path }));
      });
      return { items };
    },
    template: `
      <nav class="breadcrumb">
        <template v-for="(item, idx) in items" :key="item.path + idx">
          <span class="breadcrumb-item" :class="{ active: idx === items.length - 1 }">
            {{ item.label }}
          </span>
          <span v-if="idx < items.length - 1" class="breadcrumb-sep">/</span>
        </template>
      </nav>
    `,
  };
})(window);
