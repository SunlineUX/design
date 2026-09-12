/* ============================================================
 * layout/SidebarItem.js — 递归菜单项（接入 Vue Router）
 *   - 叶子节点点击 → router.push(item.path)
 *   - 高亮由 route.path 与 item.path 比较得出（父级子路径匹配即激活）
 *   - 有子项时点击标题只控制展开/收起
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  const { useRouter, useRoute } = global.VueRouter;

  global.LayoutComponents.SidebarItem = {
    name: 'SidebarItem',
    props: {
      item: { type: Object, required: true },
      t: { type: Function, required: true },
      collapsed: { type: Boolean, default: false },
      level: { type: Number, default: 0 },
    },
    setup(props) {
      const { ref, computed, watch } = global.Vue;
      const router = useRouter();
      const route = useRoute();

      const hasChildren = computed(() => props.item.children && props.item.children.length);

      const label = computed(() => props.t(props.item.label));

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

      return { hasChildren, isActive, expanded, showLabel, handleClick, label };
    },
    template: `
      <div class="sidebar-item" :class="{ active: isActive, expanded: expanded, hasChildren: hasChildren }">
        <div class="sidebar-item-row" @click="handleClick">
          <span class="sidebar-item-icon"><x-icon v-if="item.icon" :name="item.icon" :size="18" /></span>
          <span v-if="showLabel" class="sidebar-item-label">{{ label }}</span>
          <span v-if="hasChildren && showLabel" class="sidebar-item-arrow">
            <x-icon :name="expanded ? 'ArrowDown' : 'ArrowRight'" :size="14" />
          </span>
        </div>
        <div v-if="hasChildren && expanded && showLabel" class="sidebar-children">
          <sidebar-item
            v-for="child in item.children"
            :key="child.key"
            :item="child"
            :t="t"
            :collapsed="collapsed"
            :level="level + 1"
          />
        </div>
      </div>
    `,
  };
})(window);
