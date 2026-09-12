/* ============================================================
 * base/XDropdown.js — 下拉菜单（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-dropdown>
 *
 *   用法：
 *     <x-dropdown placement="bottom-start" @select="onSelect">
 *       <x-button>菜单 <x-icon name="ArrowDown" :size="14" /></x-button>  <!-- 触发器（默认插槽） -->
 *       <template #menu>
 *         <div class="x-dropdown-item" data-value="edit">编辑</div>
 *         <div class="x-dropdown-item" data-value="delete">删除</div>
 *       </template>
 *     </x-dropdown>
 *
 *   - click 模式：点击触发器展开 / 再点收起
 *   - hover 模式：鼠标进入触发器或菜单展开，离开整体区域关闭
 *   - 点击菜单项（带 data-value）触发 select 事件并自动关闭
 *   - 点击外部、按 Esc 关闭
 *   - 支持 v-model:open 受控展开
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XDropdown = {
    props: {
      placement: { type: String, default: 'bottom-start' }, // bottom-start | bottom-end | top-start | top-end
      open: { type: Boolean, default: false },              // 支持 v-model:open
      disabled: { type: Boolean, default: false },
      trigger: { type: String, default: 'click' },             // click | hover
    },
    emits: ['update:open', 'select'],
    setup(props, { emit }) {
      const { ref, watch, onMounted, onUnmounted } = global.Vue;
      const root = ref(null);
      const innerOpen = ref(props.open);
      let closeTimer = null;

      // 受控（v-model:open）与非受控两种模式
      watch(() => props.open, v => { innerOpen.value = v; });

      function setOpen(v) {
        clearTimeout(closeTimer);
        innerOpen.value = v;
        emit('update:open', v);
      }
      function toggle() {
        if (!props.disabled && props.trigger === 'click') setOpen(!innerOpen.value);
      }
      function openOnHover() {
        if (!props.disabled && props.trigger === 'hover') setOpen(true);
      }
      function closeOnHover() {
        if (props.trigger === 'hover') {
          clearTimeout(closeTimer);
          closeTimer = setTimeout(() => setOpen(false), 80);
        }
      }

      function onDocMouseDown(e) {
        if (innerOpen.value && root.value && !root.value.contains(e.target)) {
          setOpen(false);
        }
      }
      function onDocKeyDown(e) {
        if (e.key === 'Escape' && innerOpen.value) setOpen(false);
      }

      function onMenuClick(e) {
        const item = e.target.closest('[data-value]');
        if (item && root.value && root.value.contains(item)) {
          emit('select', item.getAttribute('data-value'));
          setOpen(false);
        }
      }

      onMounted(() => {
        document.addEventListener('mousedown', onDocMouseDown, true);
        document.addEventListener('keydown', onDocKeyDown, true);
      });
      onUnmounted(() => {
        document.removeEventListener('mousedown', onDocMouseDown, true);
        document.removeEventListener('keydown', onDocKeyDown, true);
        clearTimeout(closeTimer);
      });

      return { root, innerOpen, toggle, openOnHover, closeOnHover, onMenuClick };
    },
    template: `
      <div
        ref="root"
        class="x-dropdown"
        :class="'x-dropdown--' + placement"
        @mouseenter="openOnHover"
        @mouseleave="closeOnHover"
      >
        <div class="x-dropdown__trigger" @click="toggle">
          <slot />
        </div>
        <transition name="x-drop">
          <div v-if="innerOpen" class="x-dropdown__menu" @click="onMenuClick">
            <slot name="menu" />
          </div>
        </transition>
      </div>
    `,
  };
})(window);
