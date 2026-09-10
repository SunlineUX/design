/* ============================================================
 * layout/LayoutComponents.js — 布局层组件（已接入 Vue Router）
 *
 *   组件嵌套：
 *     AppLayout
 *     ├── AppHeader
 *     │   ├── Logo
 *     │   ├── SidebarToggle
 *     │   ├── Breadcrumb (自动从 route.matched 生成)
 *     │   └── HeaderActions (slot)
 *     ├── AppSidebar
 *     │   └── SidebarItem (递归, 叶子节点 router.push)
 *     └── router-view
 *
 *   菜单数据来自 global.Routes.menuRoutes（单一数据源）
 * ============================================================ */
(function (global) {
  'use strict';

  const { useRouter, useRoute } = global.VueRouter;

  global.LayoutComponents = {

    /* ---------- Logo ---------- */
    Logo: {
      template: `
        <div class="logo">
          <span class="logo-mark"></span>
          <span class="logo-text">NCBS</span>
        </div>
      `,
    },

    /* ---------- Breadcrumb 面包屑 ----------
     *   从 route.matched 自动生成，用 t() 翻译 meta.title
     */
    Breadcrumb: {
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
    },

    /* ---------- SidebarToggle ---------- */
    SidebarToggle: {
      props: { collapsed: { type: Boolean, default: false } },
      emits: ['toggle'],
      template: `
        <button class="sidebar-toggle" @click="$emit('toggle')" :title="collapsed ? '展开侧边栏' : '折叠侧边栏'">
          <icon :name="collapsed ? 'chevronRight' : 'chevronLeft'" :size="18" />
        </button>
      `,
    },

    /* ---------- SidebarItem：递归菜单项（接入 Vue Router） ----------
     *   - 叶子节点点击 → router.push(item.path)
     *   - 高亮由 route.path 与 item.path 比较得出
     *   - 有子项时点击标题只控制展开/收起
     */
    SidebarItem: {
      name: 'SidebarItem',
      props: {
        item: { type: Object, required: true },
        collapsed: { type: Boolean, default: false },
        level: { type: Number, default: 0 },
      },
      setup(props) {
        const { ref, computed, watch } = global.Vue;
        const router = useRouter();
        const route = useRoute();

        const hasChildren = computed(() => props.item.children && props.item.children.length);

        // 是否当前激活（路径精确匹配 或 子路径匹配）
        const isActive = computed(() => {
          if (!props.item.path) return false;
          if (route.path === props.item.path) return true;
          if (hasChildren.value) {
            // 父级：子路径匹配即为激活
            return route.path.startsWith(props.item.path + '/');
          }
          return false;
        });

        // 展开状态：初始顶级默认展开，或当前路由是其子路径时自动展开
        const expanded = ref(
          props.level === 0 ||
          (props.item.path && route.path.startsWith(props.item.path + '/'))
        );
        watch(() => route.path, () => {
          if (props.item.path && route.path.startsWith(props.item.path + '/')) {
            expanded.value = true;
          }
        });

        const showLabel = computed(() => !props.collapsed);

        const handleClick = () => {
          if (hasChildren.value) {
            expanded.value = !expanded.value;
          } else if (props.item.path) {
            router.push(props.item.path);
          }
        };

        return { hasChildren, isActive, expanded, showLabel, handleClick };
      },
      template: `
        <div class="sidebar-item" :class="{ active: isActive, expanded: expanded, hasChildren: hasChildren }">
          <div class="sidebar-item-row" @click="handleClick">
            <span class="sidebar-item-icon"><icon v-if="item.icon" :name="item.icon" :size="18" /></span>
            <span v-if="showLabel" class="sidebar-item-label">{{ item.labelText || item.label }}</span>
            <span v-if="hasChildren && showLabel" class="sidebar-item-arrow">
              <icon :name="expanded ? 'chevronDown' : 'chevronRight'" :size="14" />
            </span>
          </div>
          <div v-if="hasChildren && expanded && showLabel" class="sidebar-children">
            <sidebar-item
              v-for="child in item.children"
              :key="child.key"
              :item="child"
              :collapsed="collapsed"
              :level="level + 1"
            />
          </div>
        </div>
      `,
    },

    /* ---------- AppSidebar ---------- */
    AppSidebar: {
      props: {
        menuItems: { type: Array, required: true },
        collapsed: { type: Boolean, default: false },
        t: { type: Function, required: true },
      },
      setup(props) {
        // 渲染前把 label（i18n key）翻译为实际文字
        const { computed } = global.Vue;
        const resolvedMenu = computed(() => props.menuItems.map(mapItem));
        function mapItem(item) {
          return {
            ...item,
            labelText: props.t(item.label),
            children: item.children ? item.children.map(mapItem) : undefined,
          };
        }
        return { resolvedMenu };
      },
      template: `
        <aside class="app-sidebar" :class="{ collapsed: collapsed }">
          <div class="sidebar-menu">
            <sidebar-item
              v-for="item in resolvedMenu"
              :key="item.key"
              :item="item"
              :collapsed="collapsed"
            />
          </div>
        </aside>
      `,
    },

    /* ---------- AppHeader ---------- */
    AppHeader: {
      props: {
        collapsed: { type: Boolean, default: false },
      },
      emits: ['toggle-sidebar'],
      template: `
        <header class="app-header">
          <div class="app-header-left">
            <logo />
            <sidebar-toggle :collapsed="collapsed" @toggle="$emit('toggle-sidebar')" />
            <breadcrumb :t="$root.t" />
          </div>
          <div class="app-header-right">
            <slot name="actions" />
          </div>
        </header>
      `,
    },

    /* ---------- AppLayout：整体骨架 ---------- */
    AppLayout: {
      props: {
        menuItems: { type: Array, required: true },
        collapsed: { type: Boolean, default: false },
        t: { type: Function, required: true },
      },
      emits: ['update:collapsed'],
      setup(props, { emit }) {
        const toggle = () => emit('update:collapsed', !props.collapsed);
        return { toggle };
      },
      template: `
        <div class="app-layout">
          <app-header
            :collapsed="collapsed"
            @toggle-sidebar="toggle"
          >
            <template #actions>
              <slot name="header-actions" />
            </template>
          </app-header>
          <div class="app-body">
            <app-sidebar
              :menu-items="menuItems"
              :collapsed="collapsed"
              :t="t"
            />
            <main class="app-main">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" :t="t" />
                </transition>
              </router-view>
            </main>
          </div>
        </div>
      `,
    },
  };
})(window);
