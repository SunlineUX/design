<template>
    <span ref="triggerRef" class="dm-tooltip" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
        <slot />
        <Teleport to="body">
            <Transition name="dm-tooltip-fade">
                <div v-if="visible" ref="panelRef" class="dm-tooltip__panel" :style="panelStyle" role="tooltip">
                    <span class="dm-tooltip__arrow" :class="[`is-${arrowClass}`]" :style="arrowStyle" />
                    <slot name="title">{{ title }}</slot>
                </div>
            </Transition>
        </Teleport>
    </span>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { usePopupPosition } from './_util/usePopupPosition';

/**
 * DmTooltip —— 文字提示
 * 深色气泡 + 箭头，hover / focus 触发，空间不足自动翻转方向。
 *
 * 用法：
 *   <DmTooltip title="提示文字"><DmButton>按钮</DmButton></DmTooltip>
 *   <DmTooltip placement="right"><template #title>多行内容</template>...</DmTooltip>
 */
const props = defineProps({
    /** 提示文字（也可用 #title 插槽） */
    title: { type: String, default: '' },
    /** 位置：top / bottom / left / right / topLeft / topRight / bottomLeft / bottomRight / leftTop / leftBottom / rightTop / rightBottom */
    placement: { type: String, default: 'top' },
    /** 受控显示（传入后内部 hover 状态失效） */
    open: { type: Boolean, default: undefined },
    /** 显示延迟（ms） */
    mouseEnterDelay: { type: Number, default: 100 },
    /** 隐藏延迟（ms） */
    mouseLeaveDelay: { type: Number, default: 150 },
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['openChange']);

const triggerRef = ref(null);
const inner = ref(false);
let timer = null;

const visible = computed(() => (props.open !== undefined ? !!props.open : inner.value));

const { panelRef, panelStyle, arrowClass, arrowStyle, open: syncOpen, close: syncClose } =
    usePopupPosition(triggerRef, () => ({ placement: props.placement, arrow: true, gap: 4 }));

watch(visible, (v) => {
    emit('openChange', v);
    if (v) syncOpen();
    else syncClose();
});

function clearTimer() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
}

function show() {
    if (props.disabled || props.open !== undefined) return;
    clearTimer();
    timer = setTimeout(() => { inner.value = true; }, props.mouseEnterDelay);
}

function hide() {
    if (props.open !== undefined) return;
    clearTimer();
    timer = setTimeout(() => { inner.value = false; }, props.mouseLeaveDelay);
}

onBeforeUnmount(clearTimer);
</script>

<style scoped>
.dm-tooltip {
    display: inline-flex;
}

.dm-tooltip__panel {
    max-width: 250px;
    padding: 6px 8px;
    font-size: 14px;
    line-height: 1.5714;
    text-align: left;
    word-break: break-all;
    color: var(--bg-panel);
    background: var(--text-primary);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    z-index: calc(var(--z-popup) + 100);
}

/* 箭头（border 三角，颜色跟随气泡） */
.dm-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
}

.dm-tooltip__arrow.is-top {
    right: auto;
    bottom: 100%;
    border-width: 0 4px 4px;
    border-bottom-color: var(--text-primary);
}

.dm-tooltip__arrow.is-bottom {
    right: auto;
    border-width: 4px 4px 0;
    border-top-color: var(--text-primary);
}

.dm-tooltip__arrow.is-left {
    right: 100%;
    border-width: 4px 0 4px 4px;
    border-right-color: var(--text-primary);
}

.dm-tooltip__arrow.is-right {
    border-width: 4px 4px 4px 0;
    border-left-color: var(--text-primary);
}

/* 淡入动画 */
.dm-tooltip-fade-enter-active,
.dm-tooltip-fade-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.dm-tooltip-fade-enter-from,
.dm-tooltip-fade-leave-to {
    opacity: 0;
}
</style>
