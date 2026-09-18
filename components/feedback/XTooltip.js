/* ============================================================
 * base/XTooltip.js — 文字提示气泡（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-tooltip>
 *
 *   hover / 键盘 focus 自动显示，浮层通过 Teleport 挂载到 body：
 *     <x-tooltip content="点击折叠侧边栏" placement="top">
 *       <x-icon name="settings" :size="18" />
 *     </x-tooltip>
 *
 *   - placement：top（默认）| bottom | left | right
 *   - 触发器内元素可获得焦点时（按钮/链接/输入框），聚焦也会显示
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XTooltip = {
    props: {
      content: { type: String, required: true },
      placement: { type: String, default: 'top' }, // top | bottom | left | right
      mouseEnterDelay: { type: Number, default: 100 },
      mouseLeaveDelay: { type: Number, default: 100 },
      disabled: { type: Boolean, default: false },
    },
    setup(props) {
      const { ref, nextTick, onBeforeUnmount } = global.Vue;
      const trigger = ref(null);
      const visible = ref(false);
      const panel = ref(null);
      const panelStyle = ref({});
      const actualPlacement = ref(props.placement);
      let timer = null;

      function clearTimer() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }

      function updatePosition() {
        if (!panel.value) return;
        const result = global.XPopupPosition.update(
          trigger.value,
          panel.value,
          props.placement,
          8,
        );
        panelStyle.value = result.style;
        actualPlacement.value = result.placement;
      }

      function show() {
        if (props.disabled) return;
        clearTimer();
        timer = setTimeout(() => {
          visible.value = true;
          nextTick(updatePosition);
        }, props.mouseEnterDelay);
      }

      function hide() {
        clearTimer();
        timer = setTimeout(() => { visible.value = false; }, props.mouseLeaveDelay);
      }

      function onFocusOut(event) {
        if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) hide();
      }

      function reposition() { if (visible.value) updatePosition(); }

      global.addEventListener('resize', reposition);
      global.addEventListener('scroll', reposition, true);
      onBeforeUnmount(() => {
        clearTimer();
        global.removeEventListener('resize', reposition);
        global.removeEventListener('scroll', reposition, true);
      });

      return { trigger, visible, panel, panelStyle, actualPlacement, show, hide, onFocusOut };
    },
    template: `
      <span class="x-tooltip">
        <span ref="trigger" class="x-tooltip__trigger" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="onFocusOut"><slot /></span>
        <Teleport to="body">
          <Transition name="dm-tooltip-fade">
            <span v-if="visible" ref="panel" class="x-tooltip__inner" :class="'x-tooltip__inner--' + actualPlacement" :style="panelStyle" role="tooltip">
              {{ content }}
              <span class="x-tooltip__arrow" :class="'x-tooltip__arrow--' + actualPlacement"></span>
            </span>
          </Transition>
        </Teleport>
      </span>
    `,
  };
})(window);
