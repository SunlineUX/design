/* ============================================================
 * base/XPopover.js — 气泡浮层（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-popover>
 *
 *   用法：
 *     <x-popover trigger="click" placement="bottom" title="提示标题">
 *       <x-button>点击查看</x-button>              <!-- 触发器（默认插槽） -->
 *       <template #content>
 *         <p>这里是任意自定义内容…</p>
 *       </template>
 *     </x-popover>
 *
 *   - trigger="click"：点击展开，点外部 / Esc 关闭
 *   - trigger="hover"：悬停展开（移入浮层不关闭），移出延时关闭
 *   - placement：top | bottom | left | right
 *   - 支持 v-model:open 受控展开
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XPopover = {
    props: {
      trigger: { type: String, default: 'click' }, // click | hover
      placement: { type: String, default: 'top' },  // top | bottom | left | right
      title: { type: String, default: '' },
      showArrow: { type: Boolean, default: true },
      open: { type: Boolean, default: false },
    },
    emits: ['update:open'],
    setup(props, { emit }) {
      const { ref, watch, onMounted, onUnmounted } = global.Vue;
      const root = ref(null);
      const innerOpen = ref(props.open);
      let hoverTimer = null;

      watch(() => props.open, v => { innerOpen.value = v; });

      function setOpen(v) {
        innerOpen.value = v;
        emit('update:open', v);
      }
      function toggle() { setOpen(!innerOpen.value); }

      function onMouseEnter() {
        if (props.trigger !== 'hover') return;
        clearTimeout(hoverTimer);
        setOpen(true);
      }
      function onMouseLeave() {
        if (props.trigger !== 'hover') return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => setOpen(false), 100);
      }

      function onDocMouseDown(e) {
        if (props.trigger !== 'click') return;
        if (innerOpen.value && root.value && !root.value.contains(e.target)) {
          setOpen(false);
        }
      }
      function onDocKeyDown(e) {
        if (e.key === 'Escape' && innerOpen.value) setOpen(false);
      }

      onMounted(() => {
        document.addEventListener('mousedown', onDocMouseDown, true);
        document.addEventListener('keydown', onDocKeyDown, true);
      });
      onUnmounted(() => {
        document.removeEventListener('mousedown', onDocMouseDown, true);
        document.removeEventListener('keydown', onDocKeyDown, true);
        clearTimeout(hoverTimer);
      });

      return {
        root, innerOpen, toggle,
        onMouseEnter, onMouseLeave,
      };
    },
    template: `
      <div
        ref="root"
        class="x-popover"
        :class="['x-popover--' + placement, { 'is-open': innerOpen }]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div class="x-popover__trigger" @click="trigger === 'click' ? toggle() : null">
          <slot />
        </div>
        <transition name="x-pop">
          <div v-if="innerOpen" class="x-popover__content" :class="'x-popover__content--' + placement">
            <div v-if="title" class="x-popover__title">{{ title }}</div>
            <div class="x-popover__body"><slot name="content" /></div>
            <span v-if="showArrow" class="x-popover__arrow" :class="'x-popover__arrow--' + placement"></span>
          </div>
        </transition>
      </div>
    `,
  };
})(window);
