/* ============================================================
 * enter/XSelect.js — 下拉选择器（X 前缀基础组件）
 *   自注册到 window.XComponents，模板中使用 <x-select>
 *
 *   用法：
 *     <x-select v-model="value" :options="options" placeholder="请选择" />
 *     <x-select v-model="value" :options="options" multiple />
 *
 *   options: [{ value: 'zh', label: '中文' }, ...]
 *   - 单选：modelValue 为单个 value
 *   - 多选：modelValue 为 value 数组
 *   - 选项弹层 Teleport 到 body，避免被父级 overflow 裁切
 * ============================================================ */
(function (global) {
  'use strict';

  global.XComponents = global.XComponents || {};

  global.XComponents.XSelect = {
    props: {
      modelValue: { type: [String, Number, Array], default: '' },
      options: { type: Array, default: () => [] }, // [{ value, label, disabled }]
      placeholder: { type: String, default: '请选择' },
      disabled: { type: Boolean, default: false },
      multiple: { type: Boolean, default: false },
      clearable: { type: Boolean, default: false },
      placement: { type: String, default: 'bottom-start' },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const { ref, computed, watch, nextTick, onMounted, onUnmounted } = global.Vue;
      const root = ref(null);
      const panel = ref(null);
      const open = ref(false);
      const panelStyle = ref({});
      const actualPlacement = ref(props.placement);

      const isArray = computed(() => Array.isArray(props.modelValue));

      const selectedLabel = computed(() => {
        if (props.multiple) {
          const arr = isArray.value ? props.modelValue : [];
          if (!arr.length) return '';
          return arr.map(v => {
            const o = props.options.find(o => o.value === v);
            return o ? o.label : v;
          }).join(', ');
        }
        const o = props.options.find(o => o.value === props.modelValue);
        return o ? o.label : '';
      });

      const isSelected = (val) => {
        if (props.multiple) {
          const arr = isArray.value ? props.modelValue : [];
          return arr.includes(val);
        }
        return props.modelValue === val;
      };

      function setOpen(v) {
        open.value = v;
      }
      function toggle() {
        if (!props.disabled) setOpen(!open.value);
      }

      function selectOption(opt) {
        if (opt.disabled) return;
        if (props.multiple) {
          const arr = [...(isArray.value ? props.modelValue : [])];
          const idx = arr.indexOf(opt.value);
          if (idx > -1) arr.splice(idx, 1);
          else arr.push(opt.value);
          emit('update:modelValue', arr);
          emit('change', arr);
        } else {
          emit('update:modelValue', opt.value);
          emit('change', opt.value);
          setOpen(false);
        }
      }

      function clear(e) {
        e.stopPropagation();
        if (props.multiple) {
          emit('update:modelValue', []);
          emit('change', []);
        } else {
          emit('update:modelValue', '');
          emit('change', '');
        }
      }

      function updatePosition() {
        if (!panel.value || !root.value) return;
        const triggerEl = root.value.querySelector('.x-select__trigger');
        if (!triggerEl) return;
        const result = global.XPopupPosition.update(
          triggerEl,
          panel.value,
          props.placement,
          6,
        );
        panelStyle.value = result.style;
        actualPlacement.value = result.placement;
      }

      watch(open, v => { if (v) nextTick(updatePosition); });

      function onDocMouseDown(e) {
        if (open.value && root.value && !root.value.contains(e.target)
          && panel.value && !panel.value.contains(e.target)) {
          setOpen(false);
        }
      }
      function onDocKeyDown(e) {
        if (e.key === 'Escape' && open.value) setOpen(false);
      }

      onMounted(() => {
        document.addEventListener('mousedown', onDocMouseDown, true);
        document.addEventListener('keydown', onDocKeyDown, true);
        global.addEventListener('resize', updatePosition);
        global.addEventListener('scroll', updatePosition, true);
      });
      onUnmounted(() => {
        document.removeEventListener('mousedown', onDocMouseDown, true);
        document.removeEventListener('keydown', onDocKeyDown, true);
        global.removeEventListener('resize', updatePosition);
        global.removeEventListener('scroll', updatePosition, true);
      });

      return {
        root, panel, open, panelStyle, actualPlacement,
        selectedLabel, isSelected, toggle, selectOption, clear,
      };
    },
    template: `
      <div ref="root" class="x-select" :class="{ 'is-open': open, 'is-disabled': disabled }">
        <div class="x-select__trigger" :class="{ 'x-select__trigger--disabled': disabled }" @click="toggle">
          <span class="x-select__label" :class="{ 'x-select__placeholder': !selectedLabel }">
            {{ selectedLabel || placeholder }}
          </span>
          <span v-if="clearable && selectedLabel" class="x-select__clear" @click="clear">
            <x-icon name="Close" :size="14" />
          </span>
          <span class="x-select__arrow"><x-icon name="ArrowDown" :size="14" /></span>
        </div>
        <Teleport to="body">
          <transition name="x-drop">
            <div
              v-if="open"
              ref="panel"
              class="x-select__menu"
              :class="'x-select__menu--' + actualPlacement"
              :style="panelStyle"
            >
              <div
                v-for="opt in options"
                :key="opt.value"
                class="x-select__option"
                :class="{ 'is-selected': isSelected(opt.value), 'is-disabled': opt.disabled }"
                @click="selectOption(opt)"
              >
                <span>{{ opt.label }}</span>
                <x-icon v-if="isSelected(opt.value)" name="Choose" :size="14" />
              </div>
              <div v-if="!options.length" class="x-select__empty">暂无数据</div>
            </div>
          </transition>
        </Teleport>
      </div>
    `,
  };
})(window);
