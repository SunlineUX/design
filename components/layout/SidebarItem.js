/* ============================================================
 * layout/SideMenu.js — 递归菜单项（接入 Vue Router，支持 inline/toggle 子级与图标开关）
 *   - 叶子节点点击 → router.push(item.path)
 *   - 高亮由 route.path 与 item.path 比较得出（父级子路径匹配即激活）
 *   - 有子项时：inline 模式点击切换展开/收起；toggle 模式 hover 弹出 popover 子菜单
 *   - sidebarConfig.menu.type: 'inline' | 'toggle'（默认 inline）
 *   - sidebarConfig.menu.icons: 是否显示图标（默认 true）
 *   自注册到 window.LayoutComponents
 * ============================================================ */
(function (global) {
  'use strict';

  global.LayoutComponents = global.LayoutComponents || {};

  const { useRouter, useRoute } = global.VueRouter;

  global.LayoutComponents.SideMenu = {
    name: 'SideMenu',
    props: {
      item: { type: Object, required: true },
      t: { type: Function, required: true },
      collapsed: { type: Boolean, default: false },
      level: { type: Number, default: 0 },
      sidebarConfig: { type: Object, default: () => ({}) },
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

      const submenuMode = computed(() => props.sidebarConfig?.menu?.type === 'inline' ? 'inline' : 'toggle');
      const showIcon = computed(() => props.collapsed || props.sidebarConfig?.menu?.icons !== false);

      const handleClick = () => {
        if (hasChildren.value) {
          if (submenuMode.value === 'inline') {
            const first = props.item.children.find(c => c.path) || props.item.children[0];
            if (first && first.path) router.push(first.path);
          } else {
            expanded.value = !expanded.value;
          }
        } else if (props.item.path) {
          router.push(props.item.path);
        }
      };

      return { hasChildren, isActive, expanded, showLabel, handleClick, label, submenuMode, showIcon };
    },
    template: `
      <div v-if="!item.hidden" class="sidebar-item" :class="{ active: isActive, expanded: expanded, hasChildren: hasChildren }">
        <!-- 收起模式 + 无子级：tooltip 显示名称 -->
        <x-tooltip v-if="!showLabel && !hasChildren" :content="label" placement="right">
          <div class="sidebar-item-row" @click="handleClick">
            <span v-if="showIcon" class="sidebar-item-icon"><x-icon v-if="item.icon" :name="item.icon" :size="18" /></span>
          </div>
        </x-tooltip>

        <x-popover v-else-if="!showLabel && hasChildren" trigger="hover" placement="right" :show-arrow="true">
          <div class="sidebar-item-row" @click="handleClick">
            <span v-if="showIcon" class="sidebar-item-icon"><x-icon v-if="item.icon" :name="item.icon" :size="18" /></span>
          </div>
          <template #content>
            <div class="sidebar-submenu-floating">
              <side-menu
                v-for="child in item.children"
                :key="child.key"
                :item="child"
                :t="t"
                :collapsed="false"
                :level="level + 1"
                :sidebar-config="sidebarConfig"
              />
            </div>
          </template>
        </x-popover>

        <template v-else-if="submenuMode === 'toggle'" alt="有子项时：toggle 模式 hover 弹出 popover 子菜单">
          <div class="sidebar-item-row" @click="handleClick">
            <span v-if="showIcon" class="sidebar-item-icon"><x-icon v-if="item.icon" :name="item.icon" :size="18" /></span>
            <span v-if="showLabel" class="sidebar-item-label">{{ label }}</span>
            <span v-if="hasChildren && showLabel" class="sidebar-item-arrow">
              <x-icon :name="expanded ? 'ArrowDown' : 'ArrowRight'" :size="14" />
            </span>
          </div>
          <div v-if="hasChildren && expanded && showLabel" class="sidebar-children">
            <side-menu
              v-for="child in item.children"
              :key="child.key"
              :item="child"
              :t="t"
              :collapsed="collapsed"
              :level="level + 1"
              :sidebar-config="sidebarConfig"
            />
          </div>
        </template>

        <x-popover v-else-if="hasChildren" trigger="hover" placement="right" :show-arrow="true">
          <div class="sidebar-item-row" @click="handleClick">
            <span v-if="showIcon" class="sidebar-item-icon"><x-icon v-if="item.icon" :name="item.icon" :size="18" /></span>
            <span v-if="showLabel" class="sidebar-item-label">{{ label }}</span>
            <span v-if="showLabel" class="sidebar-item-arrow">
              <x-icon name="ArrowRight" :size="14" />
            </span>
          </div>
          <template #content>
            <div class="sidebar-submenu-floating">
              <side-menu
                v-for="child in item.children"
                :key="child.key"
                :item="child"
                :t="t"
                :collapsed="false"
                :level="level + 1"
                :sidebar-config="sidebarConfig"
              />
            </div>
          </template>
        </x-popover>

        <template v-else>
          <div class="sidebar-item-row" @click="handleClick">
            <span v-if="showIcon" class="sidebar-item-icon"><x-icon v-if="item.icon" :name="item.icon" :size="18" /></span>
            <span v-if="showLabel" class="sidebar-item-label">{{ label }}</span>
          </div>
        </template>
      </div>
    `,
  };
})(window);
